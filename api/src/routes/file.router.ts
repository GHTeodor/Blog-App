import { Router } from 'express';

import { fileController } from '../controllers';
import { upload } from '../helpers';

const router = Router();

router.post('/upload', upload.single('file'), fileController.uploadFile);
router.post('/avatar', upload.single('avatar'), fileController.addAvatar);

export const fileRouter = router;
