import { Request, Response, NextFunction } from 'express';

import { userNormalizer } from '../helpers';
import { IRequestExtended, IUser } from '../interfaces';
import { dbPromise } from '../database';
import { ApiError } from '../errors';

class UserMiddleware {
    async checkIsUserExist(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const q = 'SELECT * FROM users WHERE id = ?';
            const data = await dbPromise(q, [id])
                .catch((err) => next(new ApiError(err.message, 500))) as Array<IUser>;

            if (!data.length) {
                return next(new ApiError('User not found!', 404));
            }

            req.user = { ...data[0] };

            next();
        } catch (e) {
            next(e);
        }
    }

    checkIsUserFieldsEmpty(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, email, password } = req.body;
            if (!username) next(new ApiError('Username is required', 400));
            if (!email) next(new ApiError('Email is required', 400));
            if (!email.includes('@')) next(new ApiError('Email field is not an email "@"', 400));
            if (!password) next(new ApiError('Password is required', 400));

            next();
        } catch (e) {
            next(e);
        }
    }

    userNormalizer(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, email } = req.body;
            if (username) { req.body.username = userNormalizer.username(username); }
            if (email) { req.body.email = userNormalizer.email(email); }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();
