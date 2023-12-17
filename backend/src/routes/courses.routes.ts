import express from 'express';
import { createCourses, deleteCourse, editCourses, getCourses, getCourseById } from '../controllers/courses.controller';
import { upload } from '../middlewares/multer.middleware';



const router = express.Router();

router.post('/', upload.array('photo', 12), createCourses)
router.get('/', getCourses)
router.delete('/:id', deleteCourse)
router.get('/:id', getCourseById)
router.patch('/:id', editCourses)

export default router;