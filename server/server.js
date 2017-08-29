const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

// Utils
const { generateMessage, generateLocationMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

// Config socket IO
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined the lobby'));

    socket.on('createMessage', (message, callback) => {
        // console.log('Create message', message);

        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime
        // });
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
        socket.broadcast.emit('newMessage', generateMessage('Admin', 'A user left the lobby'));
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});