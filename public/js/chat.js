var socket = io();

//'scrollToBottom' function using 'jQuery' methods to grab the selectors and properties:
function scrollToBottom () {
  //Selectors
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child');
  //Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop= messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();
  //scroll to bottom if the user is close to the bottom:
  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
};

//We can register an event in the frontend as well. It will show in the console tab in the chrome-dev tools. We use conventional functions instead of arrow functions to avoid crashing in browsers like safari, IE:
socket.on('connect', function () {
  // console.log('Connected to the server');
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

//To join a chat room:
  var params = $.deparam(window.location.search);
  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);
      //Redirect to the root page (join page):
      window.location.href = '/';
    }
    else {
      console.log('No error');
    }
  });
});
//For the disconnect case:
socket.on('disconnect', function () {
  console.log('Disconnected to the server');
});

//To update the users list in the room:
socket.on('updateUserList', function (users) {
  //We use jQuery to show the actual users list on the left side of the chat room:
  var ol = $('<ol></ol>');
  users.forEach(function (user) {
    ol.append($('<li></li>').text(user));
  });
  $('#users').html(ol);
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
  // var li = $('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);

  //Use of 'mustache.js' to display the messages in the 'index.html' file:
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  //Append the message as the last child:
  $('#messages').append(html);
  //Call of the 'scrollToBottom' function:
  scrollToBottom();
});

//Event listener for 'newLocationMessage':
socket.on('newLocationMessage', function (message) {
  //Use of the 'moment.js' library to display the time:
  var formattedTime = moment(message.createdAt).format('h:mm a');
  // var li = $('<li></li>');
  //Variable for the anchor text:
  // var a = $('<a target="_blank">My current location</a>');
  // li.text(`${message.from} ${formattedTime}: `);
  //Add an html attribute via jQuery:
  // a.attr('href', message.url);
  // li.append(a);

  //Use of 'mustache.js' to display the messages in the 'index.html' file:
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });
  //Append the message as the last child:
  $('#messages').append(html);
  //Call of the 'scrollToBottom' function:
  scrollToBottom();
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
