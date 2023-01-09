import { Router } from 'express';

import { authController } from '../controllers';
import { authMiddleware, userMiddleware } from '../middlewares';

const router = Router();

router.post('/registration', userMiddleware.userNormalizer, userMiddleware.checkIsUserFieldsEmpty, authController.registration);
router.post('/login', userMiddleware.userNormalizer, authMiddleware.checkIsLoginFieldsEmpty, authController.login);
router.post('/logout', authController.logout);

export const authRouter = router;
