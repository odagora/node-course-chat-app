//We require the 'path' nodejs method to set the public path.See: 'https://nodejs.org/dist/latest-v8.x/docs/api/path.html':
const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const socketIO = require('socket.io');
// console.log(publicPath);

//We import express framework to create the server:
const express = require('express');
var app = express();
//To create a server that uses 'socket.io', we need to add a new server using the 'http' node.js method:
var server = http.createServer(app);
//Then we pass the server to the 'socketIO' variable:
var io = socketIO(server);

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
  // Event fot the 'createMessage' function:
  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    //emit an event for every user connected with the 'io':
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });
  //Event emit for a 'newMessage' from the server to the client:
  // socket.emit('newMessage', {
  //   from: 'example@exaxmple.com',
  //   text: 'Hello',
  //   createdAt: 123
  // });

  //We register another event that fires when the user closes the tab/window with the connection:
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

//We change the 'app' variable to 'server':
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
