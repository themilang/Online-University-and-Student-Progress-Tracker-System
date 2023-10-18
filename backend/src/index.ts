import express , { Request , Response} from 'express'
import "dotenv/config";
import { dbConnection } from './config/db.config';
import indexRouter from './routes/index'
import passport from 'passport';
import expressSession from 'express-session'
import { passportInitialize } from './middlewares/passport.middleware';

const app = express();

dbConnection();

app.use(expressSession({
    secret: 'test123#',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

  passportInitialize ();

  app.use(passport.initialize()); // middleware
  app.use(passport.session());

  
app.use( indexRouter);

const PORT = process.env.PORT ?? 8085;

app.listen(PORT,()=>{
    console.log('backend is running ');
})