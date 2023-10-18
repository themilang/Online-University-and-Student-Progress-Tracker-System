import express , {Request,Response} from 'express'
import passport from 'passport';
const router = express.Router();

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}))

router.get('/login/failed',(req:Request,res:Response)=>{
    res.status(401).json({
        message:'unautherized user'
    })
})

router.get('/auth/google/callback',passport.authenticate('google',{
    successRedirect:process.env.CLIENT_URL+'/dashboard',
    failureRedirect:('/login/failed')
}))

export default router