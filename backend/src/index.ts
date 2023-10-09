import express , { Request , Response} from 'express'


const app = express();

app.get('/',(req:Request,res:Response)=>{
    res.send('Elearning Backend')
})

app.listen(3000,()=>{
    console.log('backend is running')
})