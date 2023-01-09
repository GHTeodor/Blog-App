import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import fsPromises from 'node:fs/promises';
import path from 'node:path';

import { dbPromise } from '../database';
import { config, Cookie } from '../configs';
import { ApiError } from '../errors';
import { IRequestExtended } from '../interfaces';
import { passwordHelper } from '../helpers';

class UserController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const q = 'SELECT * FROM users';

            const rows = await dbPromise(q)
                .catch((err) => next(new ApiError(err, 500)));

            return res.status(200).json(rows);
        } catch (e) {
            next(e);
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const q = 'SELECT * FROM users u WHERE u.id=?';

            const data = await dbPromise(q, [req.params.id])
                .catch((err) => next(new ApiError(err, 500))) as Array<object>;

            return res.status(200).json(data[0]);
        } catch (e) {
            next(e);
        }
    }

    async updateOne(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            if (req.body.password && req.body.oldPassword) {
                await passwordHelper.comparePasswords(req.body.oldPassword, req.user?.password!); // Check old password
            }

            const q = 'UPDATE users SET `username`=?, `email`=?, `image`=?, `password`=? WHERE `id`=?';

            const values = [
                req.body.username,
                req.body.email,
                req.body.image || '',
                await passwordHelper.hashPassword(req.body.password),
                req.params.id,
            ];

            await dbPromise(q, values).catch((err) => new ApiError(err.message, 500));

            if (req.user?.image) {
                await fsPromises
                    .unlink(path.join(process.cwd(), 'src', 'static', req.user.image))
                    .catch((err) => new ApiError(err));
            }

            res.status(200).json(req.user);
        } catch (e) {
            next(e);
        }
    }

    async deleteOne(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const db = dbPromise;

            const accessToken = req.cookies[Cookie.ACCESS_TOKEN];
            if (!accessToken) return next(new ApiError('Not authenticated!', 401));

            await jwt.verify(accessToken, config.ACCESS_TOKEN_KEY, async (error: any, userInfo: any) => {
                if (error) return next(new ApiError('Token is not valid', 403));

                console.log('userInfo ?ID?\n', userInfo);
                if (+req.params.id !== userInfo.id) return next(new ApiError('You can delete only your account', 403));

                const q = 'DELETE FROM users WHERE `id` = ?';

                await db(q, [req.params.id])
                    .catch((err) => next(new ApiError(err, 500)));

                if (req.user?.image) {
                    await fsPromises.unlink(path.join(process.cwd(), 'src', 'static', req.user.image));
                }

                return res.clearCookie(Cookie.ACCESS_TOKEN, {
                    sameSite: 'none',
                    secure: true,
                }).sendStatus(204);
            });
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();
