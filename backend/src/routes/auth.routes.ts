import express, { Request, Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/login/failed', (req: Request, res: Response) => {
    res.status(401).json({
        message: 'Unauthorized user'
    })
})

router.get('/google/callback', (req, res, next) => {
    passport.authenticate('google', (err: any, user: any) => {
        if (err) {
            return next(err);
        }
        const secretKey: string = process.env.JWT_SECRET_KEY ?? '';
        const token = jwt.sign({ email: user["_json"].email }, secretKey, {
            expiresIn: '3d'
        })
        res.cookie('jwtToken', token);
        res.redirect(`${process.env.CLIENT_URL}/dashboard`);
    })(req, res, next);
});

export default router;