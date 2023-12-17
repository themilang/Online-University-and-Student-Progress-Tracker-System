import express from 'express';
import "dotenv/config";
import { dbConnection } from './config/db.config';
import indexRouter from './routes/index';
import passport from 'passport';
import expressSession from 'express-session';
import { passportInitialize } from './middlewares/passport.middleware';
import cors from 'cors';
import { Server, Server as SocketIOServer } from 'socket.io';
import http from 'http';
// import initializeFirebaseApp from './firebase/initializeFirebase';


const app = express();
app.use(cors());
const server = http.createServer(app);

//initialize a socket io server instance
const io: SocketIOServer = new Server(server, {
    cors: {
        origin: 'http://localhost:5173'
    }
})


dbConnection();


// initializeFirebaseApp()

app.use(expressSession({
    secret: 'test123#',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
}))
passportInitialize();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use(indexRouter);

const PORT = process.env.PORT ?? 8085;

// Add socket io event handling
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    //data refers to room id sent from frontend
    socket.on('join_room', (data) => {
        socket.join(data);
        console.log(`User with id ${socket.id} joined room: ${data}`);
    })
    //in this case, data refers to message sent from client -> object
    socket.on('send_message', (data) => {
        //data base save message here
        socket.to(data.room).emit('receive_message', data);
    })

    socket.on('disconnect', () => {
        console.log('User Disconnected', socket.id);
    })
})

io.listen(9000)

app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`)
})



