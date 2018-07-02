//We require the 'path' nodejs method to set the public path.See: 'https://nodejs.org/dist/latest-v8.x/docs/api/path.html':
const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const socketIO = require('socket.io');
// console.log(publicPath);

//Import the 'generateMessage' file:
const {generateMessage, generateLocationMessage} = require('./utils/message');

//Import the join validation file:
const {isRealString} = require('./utils/validation');
//Import the users file:
const {Users} = require('./utils/users');

//We import express framework to create the server:
const express = require('express');
var app = express();
//To create a server that uses 'socket.io', we need to add a new server using the 'http' node.js method:
var server = http.createServer(app);
//Then we pass the server to the 'socketIO' variable:
var io = socketIO(server);
//We createa new instance of the users:
var users = new Users();
//We define to use the 'public' folder as a static asset:
app.use(express.static(publicPath));

//We register an event listener to use with 'socket.io'. In this case when a connection is established:
io.on('connection', (socket) => {
  console.log('New user connected');
  //Event emit for a new email from the server to the client:
  // socket.emit('newEmail', {
  //   from: 'example@example.com',
  //   text: 'Hey whats up',
  //   createdAt: 123
  // });
  //Event for a 'createEmail' from the client to the server:
  // socket.on('createEmail', (newEmail) =>{
  //   console.log('createEmail', newEmail);
  // });

  //Event listener to the 'join' emit:
  socket.on('join', (params, callback) => {
    //Check if the join data is real string:
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.')
    }
    //Socket.io rooms management:
    socket.join(params.room);
    //We remove the user from other rooms:
    users.removeUser(socket.id);
    //Then we add the user to the new room:
    users.addUser(socket.id, params.name, params.room);
    //To emit only for the users in a certain room:
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    //Socket.emit from 'Admin' with text 'Welcome to the chat app':
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    //Socket.broadcast.emit from 'Admin' with text 'New user joined':
    // socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
    //To emit only for the users in a certain room:
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    callback();
  });

  // Event fot the 'createMessage' function with a callback function as an argument for the aknowledgement:
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    //Emit an event for every user connected with the 'io':
    io.emit('newMessage', generateMessage(message.from, message.text));
    //We fire the callback back to the client to execute the function as the third argument in 'index.js':
    callback('This is from the server');
    //To emit an event to everybody but this socket, we use the broadcast function:
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  //Event listener of 'createLocationMessage':
  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });
  //Event emit for a 'newMessage' from the server to the client:
  // socket.emit('newMessage', {
  //   from: 'example@exaxmple.com',
  //   text: 'Hello',
  //   createdAt: 123
  // });

  //We register another event that fires when the user closes the tab/window with the connection:
  socket.on('disconnect', () => {
    // console.log('User disconnected');
    // We save the user removed:
    var user = users.removeUser(socket.id);
    //Then we emit two events: first to update the users list and second to print a message to the user:
    io.to(user.room).emit('updateUserList', users.getUserList(user.room));
    io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
  });
});

//We change the 'app' variable to 'server':
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
