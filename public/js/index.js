var socket = io();
//We can register an event in the frontend as well. It will show in the console tab in the chrome-dev tools. We use conventional functions instead of arrow functions to avoid crashing in browsers like safari, IE:
socket.on('connect', function () {
  console.log('Connected to the server');
  //We emit the 'createEmail' event inside the connect method:
//   socket.emit('createEmail', {
//     to: 'jen@example.com',
//     text: 'Hey!'
//   });
  //We emit the 'createMessage' event inside the connect method:
//   socket.emit('createMessage', {
//     from: 'Daniel',
//     text: 'Hey, how are you?'
//   });
});
//For the disconnect case:
socket.on('disconnect', function () {
  console.log('Disconnected to the server');
});
//For the 'newEmail' event.
// socket.on('newEmail', function(email) {
//   console.log('New Email', email);
// });

socket.on('newMessage', (message) => {
  console.log('newMessage', message);
});
