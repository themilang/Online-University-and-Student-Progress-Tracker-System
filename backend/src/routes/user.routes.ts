import express from 'express';
import { getInfo, signin, signup } from '../controllers/users.controller';
// import { auth } from 'firebase-admin';

const router = express.Router();

router.post('/register', signup);
router.post('/login', signin);
// router.get('/me', auth, getInfo);

export default router;