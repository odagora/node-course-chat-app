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
  //Use of jQuery to display the messages in the 'index.html' file as an ordered list:
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  //Append the message as the last child:
  $('#messages').append(li);
});

//Event listener for 'newLocationMessage':
socket.on('newLocationMessage', function (message) {
  var li = $('<li></li>');
  //Variable for the anchor text:
  var a = $('<a target="_blank">My current location</a>');
  li.text(`${message.from}: `);
  //Add an html attribute via jQuery:
  a.attr('href', message.url);
  li.append(a);
  //Append the message as the last child:
  $('#messages').append(li);
});

//Event emitted to the server with a third argument as a callback function. This function will be fired when the aknowledgement arrives at a client:
// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'Hi'
// }, function (data) {
//   console.log('Got it', data);
// });

//jQuery process to manipulate the DOM of 'index.html'. We use the 'preventDefault' method to avoid the page refresh on submit by default and override the behaviour with the socket.io events:
$('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: "User",
    text: $('[name=message]').val()
  }, function () {

  });
});

//Geolocation API use to show the user's actual position:
var locationButton = $('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }
  navigator.geolocation.getCurrentPosition(function (position) {
      // console.log(position);
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
  }, function () {
    alert('Unable to fetch location.');
  });
});
