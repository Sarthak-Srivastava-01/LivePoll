// import express
const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");
const UserRouter = require('./routers/UserRouter');
const RoomRouter = require('./routers/RoomRouter');
const cors = require('cors');

// initialize express
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
});

io.on("connection", (socket) => {
    console.log(`client connected with socket id : ${socket.id}`);

    socket.on('join-room', (roomName) => {
        socket.join(roomName);
        console.log(socket.id + ' joined '+roomName);
        
    })

    socket.on('send-question', ({question, room}) => {
        console.log(room, question);
        
        socket.to(room).emit('rec-question', question);
    })

    socket.on('send-answer', ({answer, room}) => {
        console.log(room, answer);
        
        socket.to(room).emit('rec-answer', answer);
    })

});

// Assign port
const PORT = 3001;

// middleware
app.use(cors({
    origin: ['http://localhost:3000']
}));
app.use(express.json());
app.use('/user', UserRouter);
app.use('/room', RoomRouter);


// run server
httpServer.listen(PORT, () => { console.log('server started'); });