var moment = require('moment');

// var date = new Date();
// console.log(date.getMonth());

var date = moment();
// date.add(100, 'year');
// console.log(date.format('MMM Do YYYY'));

//For example 10:35 am:
console.log(date.format('h:mm a'));
