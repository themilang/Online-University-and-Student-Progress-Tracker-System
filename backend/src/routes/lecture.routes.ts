import express from 'express';
import { upload } from '../middlewares/multer.middleware';
import { authorize } from '../middlewares/auth.middleware';
import { createLecture, deleteLecture, editLecture, getLecture, getLectureById } from '../controllers/lecture.controller';


const router = express.Router();

router.post('/', upload.single('video'), createLecture)
router.get('/', getLecture);
router.patch('/:id', upload.single('video'), editLecture);
router.get('/:id', getLectureById);
router.delete('/:id', deleteLecture);

export default router;