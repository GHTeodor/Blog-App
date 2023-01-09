import { Router } from 'express';

import { postController } from '../controllers';
import { postMiddleware } from '../middlewares';

const router = Router();

router.get('/', postController.getAll);
router.post('/', postMiddleware.postNormalizer, postController.addOne);

router.get('/initial-posts', postController.getInitialPosts); // to see some initial posts if there is no any posts yet

router.get('/:id', postController.getOne);
router.put('/:id', postMiddleware.postNormalizer, postMiddleware.checkIsPostExist, postController.updateOne);
router.delete('/:id', postController.deleteOne);

export const postRouter = router;
