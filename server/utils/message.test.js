//We import the 'expect' test assertion library:
var expect = require('expect');
//We require the 'generateMessage' file:
var{generateMessage, generateLocationMessage} = require('./message');

//First block of tests for 'generateMessage':
describe('generateMessage', () => {
  //First syncronous test. Doesn't need to pass the 'done' async argument:
  it('should generate correct message object', () => {
    var from = 'Jen';
    var text = 'Some message';
    //Store res in variable
    var message = generateMessage(from, text);
    //Assert 'from' and 'text' match:
    expect(message).toInclude({from, text});
    //Assert createdAt is number
    expect(message.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Daniel';
    var latitude = 1;
    var longitude = 1;
    var url = 'https://www.google.com/maps?q=1,1';
    //Store res in variable:
    var message = generateLocationMessage(from, latitude, longitude);
    //Assert 'from' and 'url' match:
    expect(message).toInclude({from, url});
    //Assert createdAt is number
    expect(message.createdAt).toBeA('number');
  });
});
