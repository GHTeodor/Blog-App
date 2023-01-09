import { NextFunction, Request, Response } from 'express';

class FileController {
    uploadFile(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(200)
                .json(req.file?.filename);
        } catch (e) {
            next(e);
        }
    }

    addAvatar(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(200)
                .json(req.file?.filename);
        } catch (e) {
            next(e);
        }
    }
}

export const fileController = new FileController();
