import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors';

class AuthMiddleware {
    async checkAccessToken(req: Request, res: Response, next: NextFunction) {
        try {
            next();
        } catch (e) {
            next(e);
        }
    }

    async checkRefreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            next();
        } catch (e) {
            next(e);
        }
    }

    checkIsLoginFieldsEmpty(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password } = req.body;
            if (!username) next(new ApiError('Username is required', 400));
            if (!password) next(new ApiError('Password is required', 400));

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
