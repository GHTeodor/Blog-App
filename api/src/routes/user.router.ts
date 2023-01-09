import { Router } from 'express';

import { userController } from '../controllers';
import { userMiddleware } from '../middlewares';

const router = Router();

router.get('/', userController.getAll);

router.get('/:id', userController.getOne);
router.put('/:id', userMiddleware.userNormalizer, userMiddleware.checkIsUserFieldsEmpty, userMiddleware.checkIsUserExist, userController.updateOne);
router.delete('/:id', userMiddleware.checkIsUserExist, userController.deleteOne);

export const userRouter = router;
