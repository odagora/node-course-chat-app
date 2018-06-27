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
  // console.log('newMessage', message);
  //Use of the 'moment.js' library to display the time:
  var formattedTime = moment(message.createdAt).format('h:mm a');
  //Use of jQuery to display the messages in the 'index.html' file as an ordered list:
  var li = $('<li></li>');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);
  //Append the message as the last child:
  $('#messages').append(li);
});

//Event listener for 'newLocationMessage':
socket.on('newLocationMessage', function (message) {
  //Use of the 'moment.js' library to display the time:
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = $('<li></li>');
  //Variable for the anchor text:
  var a = $('<a target="_blank">My current location</a>');
  li.text(`${message.from} ${formattedTime}: `);
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
  var messageTextbox = $('[name=message]');
  socket.emit('createMessage', {
    from: "User",
    text: messageTextbox.val()
  }, function () {
    //Clear the input field after message is sent:
    messageTextbox.val('');
  });
});

//Geolocation API use to show the user's actual position:
var locationButton = $('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }
  //To disable 'send location' button when processing api request:
  locationButton.attr('disabled', 'disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function (position) {
      // console.log(position);
      // Enable 'send location' button to new request:
      locationButton.removeAttr('disabled').text('Send location');
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  });
});
