import {
    NextFunction, Request, Response, Router,
} from 'express';

import {
    authRouter, postRouter, userRouter, fileRouter,
} from './index';
import { ApiError } from '../errors';

const router = Router();

router.use('/auth', authRouter);
router.use('/posts', postRouter);
router.use('/users', userRouter);
router.use('/file', fileRouter);
router.use('*', (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({
        message: err.message || 'Unexpected error',
        status: err.status || 500,
        ok: false,
    });
});

export const apiRouter = router;
