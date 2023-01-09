import { Request, Response, NextFunction } from 'express';

import { postNormalizer } from '../helpers';
import { IPost, IRequestExtended } from '../interfaces';
import { dbPromise } from '../database';
import { ApiError } from '../errors';

class PostMiddleware {
    async checkIsPostExist(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const q = 'SELECT * FROM posts WHERE id = ?';
            const data = await dbPromise(q, [id])
                .catch((err) => next(new ApiError(err.message, 500))) as Array<IPost>;

            if (!data.length) {
                return next(new ApiError('Post not found!', 404));
            }

            req.post = { ...data[0] };

            next();
        } catch (e) {
            next(e);
        }
    }

    postNormalizer(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, description, category } = req.body;
            if (title) { req.body.title = postNormalizer.title(title); }
            if (description) { req.body.description = postNormalizer.description(description); }
            if (category) { req.body.category = postNormalizer.category(category); }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const postMiddleware = new PostMiddleware();
