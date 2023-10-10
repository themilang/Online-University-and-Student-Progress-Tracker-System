import express , { Request , Response} from 'express'
import "dotenv/config";
import { dbConnection } from './config/db.config';
import indexRouter from './routes/index'

const app = express();

dbConnection();
app.use( 'api/v1',indexRouter);

app.listen(3000,()=>{
    console.log('backend is running')
})