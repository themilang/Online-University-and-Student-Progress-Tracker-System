import express from 'express';
import authRouter from './auth.routes';
import userRouter from './user.routes'
import { authMiddleware } from '../middlewares/auth.middleware';
import courseRouter from './courses.routes';
import lecureRouter from './lecture.routes';




const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/courses', authMiddleware as any, courseRouter)
router.use('/lectures', authMiddleware as any, lecureRouter)



export default router;