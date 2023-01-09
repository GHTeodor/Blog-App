import multer from 'multer';
import { Request } from 'express';
import { v1 as uuidV1 } from 'uuid';
import path from 'node:path';

import { constant } from '../configs';
import { ApiError } from '../errors';

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const storage = multer.diskStorage({
    destination(req: Request, file: Express.Multer.File, cb: DestinationCallback) {
        cb(null, path.join(__dirname, '..', 'static'));
    },
    filename(req: Request, file: Express.Multer.File, cb: FileNameCallback) {
        cb(null, uuidV1() + file.originalname);
    },
});

export const upload = multer({
    storage,
    limits: {
        fileSize: constant.PHOTO_MAX_SIZE,
    },
    fileFilter(req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
        return !constant.PHOTOS_MIMETYPES.includes(file.mimetype)
            ? cb(new ApiError(`Wrong file format [${file.mimetype}]`))
            : cb(null, true);
    },
});
