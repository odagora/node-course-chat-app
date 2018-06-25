//We import the 'expect' test assertion library:
var expect = require('expect');
//We require the 'generateMessage' file:
var{generateMessage} = require('./message');

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
