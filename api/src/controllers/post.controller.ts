import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import fsPromises from 'node:fs/promises';
import path from 'node:path';
import { db } from '../database';
import { config, Cookie, initialPosts } from '../configs';
import { ApiError } from '../errors';
import { IRequestExtended } from '../interfaces';

class PostController {
    getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const q = req.query.category
                ? 'SELECT * FROM posts WHERE `category`=?'
                : 'SELECT * FROM posts';

            db.query(q, [req.query.category], (err, data) => {
                if (err) return next(new ApiError(err.message, 500));

                res.status(200).json(data);
            });
        } catch (e) {
            next(e);
        }
    }

    addOne(req: Request, res: Response, next: NextFunction) {
        try {
            const accessToken = req.cookies[Cookie.ACCESS_TOKEN];
            if (!accessToken) return next(new ApiError('Not authenticated!', 401));

            jwt.verify(accessToken, config.ACCESS_TOKEN_KEY, (err: any, userInfo: any) => {
                if (err) return next(new ApiError('Token is not valid!', 403));

                const q = 'INSERT INTO posts(`title`, `description`, `image`, `category`, `date`, `user_id`) VALUES (?)';

                const values = [
                    req.body.title,
                    req.body.description,
                    req.body.image,
                    req.body.category,
                    req.body.date,
                    userInfo.id,
                ];

                db.query(q, [values], (err, data) => {
                    if (err) return next(new ApiError(err.message, 500));

                    return res.json('Post has been created');
                });
            });
        } catch (e) {
            next(e);
        }
    }

    getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const q = 'SELECT p.id, `username`, `title`, `description`, p.image, u.image AS userImg, `category`,`date` FROM users u JOIN posts p ON u.id = p.user_id WHERE p.id = ?';

            db.query(q, [req.params.id], (err, data) => {
                if (err) return next(new ApiError(err.message, 500));

                if (Array.isArray(data)) return res.status(200).json(data[0]);
            });
        } catch (e) {
            next(e);
        }
    }

    updateOne(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const accessToken = req.cookies[Cookie.ACCESS_TOKEN];
            if (!accessToken) return next(new ApiError('Not authenticated!', 401));

            jwt.verify(accessToken, config.ACCESS_TOKEN_KEY, (err: any, userInfo: any) => {
                if (err) return next(new ApiError('Token is not valid!', 403));

                const postId = req.params.id;
                const q = 'UPDATE posts SET `title`=?, `description`=?, `image`=?, `category`=? WHERE `id`=? AND `user_id`=?';

                const values = [
                    req.body.title,
                    req.body.description,
                    req.body.image,
                    req.body.category,
                ];

                db.query(q, [...values, postId, userInfo.id], async (err, data) => {
                    if (err) return next(new ApiError(err.message, 500));

                    if (req.post?.image && (req.post.image !== req.body.image)) {
                        await fsPromises
                            .unlink(path.join(process.cwd(), 'src', 'static', req.post.image))
                            .catch((err) => new ApiError(err));
                    }

                    return res.json('Post has been updated');
                });
            });
        } catch (e) {
            next(e);
        }
    }

    deleteOne(req: Request, res: Response, next: NextFunction) {
        try {
            const accessToken = req.cookies[Cookie.ACCESS_TOKEN];
            if (!accessToken) return next(new ApiError('Not authenticated!', 401));

            jwt.verify(accessToken, config.ACCESS_TOKEN_KEY, (err: any, userInfo: any) => {
                if (err) return next(new ApiError('Token is not valid!', 403));

                const postId = req.params.id;
                const q = 'DELETE FROM posts WHERE `id` = ? AND `user_id` = ?';

                db.query(q, [postId, userInfo.id], (err, data) => {
                    if (err) return next(new ApiError('You can delete only your post!', 403));

                    return res.sendStatus(204);
                });
            });
        } catch (e) {
            next(e);
        }
    }

    getInitialPosts(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(200).json(initialPosts);
        } catch (e) {
            next(e);
        }
    }
}

export const postController = new PostController();
