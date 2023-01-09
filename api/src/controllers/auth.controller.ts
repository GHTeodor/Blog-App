import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import { db } from '../database';
import { config, Cookie } from '../configs';
import { ApiError } from '../errors';
import { passwordHelper } from '../helpers';

class AuthController {
    registration(req: Request, res: Response, next: NextFunction) {
        try {
            // CHECK EXISTING USER
            const q = 'SELECT * FROM users WHERE email = ? OR username = ?';

            db.query(q, [req.body.email, req.body.name], async (err, data) => {
                if (err) return next(new ApiError(err.message));

                if (Array.isArray(data) && data.length) return next(new ApiError('User already exists!', 409));

                // Hash the password and create a user
                // const hash = bcrypt.hashSync(req.body.password, 10);
                const hash = await passwordHelper.hashPassword(req.body.password);

                const q = 'INSERT INTO users(`username`, `email`, `password`) VALUES (?)';
                const values = [req.body.username, req.body.email, hash];

                db.query(q, [values], (err, data) => {
                    if (err) return next(new ApiError(err.message, 500));

                    return res.status(200).json({ ...req.body, password: hash });
                });
            });
        } catch (e) {
            next(e);
        }
    }

    login(req: Request, res: Response, next: NextFunction) {
        try {
            // CHECK USER
            const q = 'SELECT * FROM users WHERE username = ?';

            db.query(q, [req.body.username], async (err, data) => {
                if (err) return next(new ApiError(err.message, 500));

                if (Array.isArray(data)) {
                    if (!data.length) {
                        return next(new ApiError('User not found!', 404));
                    }

                    //     CHECK PASSWORD
                    // @ts-ignore
                    const { id, password, ...others } = data[0];

                    // const isPasswordCorrect = await bcrypt.compare(req.body.password, password);
                    // if (!isPasswordCorrect) return next(new ApiError('Wrong username or password!', 400));

                    await passwordHelper.comparePasswords(req.body.password, password);

                    const accessToken = jwt.sign({ id }, config.ACCESS_TOKEN_KEY, { expiresIn: config.ACCESS_EXPIRES_IN });
                    const refreshToken = jwt.sign({ id }, config.REFRESH_TOKEN_KEY, { expiresIn: config.REFRESH_EXPIRES_IN });

                    const q = 'INSERT INTO tokens(`user_id`, `access_token`, `refresh_token`) VALUES (?)';
                    const values = [id, accessToken, refreshToken];

                    db.query(q, [values], (err, data) => {
                        if (err) return next(new ApiError(err.message));

                        res.cookie(Cookie.ACCESS_TOKEN, accessToken, { httpOnly: true })
                            .status(200).json({ ...others, id });
                    });
                }
            });
        } catch (e) {
            next(e);
        }
    }

    logout(req: Request, res: Response, next: NextFunction) {
        try {
            const q = 'DELETE FROM tokens';

            db.query(q, (err, data) => {
                if (err) return next(new ApiError(err.message, 500));

                res.clearCookie(Cookie.ACCESS_TOKEN, {
                    sameSite: 'none',
                    secure: true,
                }).sendStatus(200);
            });
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
