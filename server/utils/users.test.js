const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
  //To test the removeUser, getUser and getUserList functions, we need to seed data to have users before all the tests:
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Daniel',
      room: 'React Course'
    }, {
      id: '3',
      name: 'Jean',
      room: 'Node Course'
    }];
  });
  //First user test case for the 'addUser' method:
  it('should add new user', () => {
    var users = new Users;
    var user = {
      id: '2123',
      name: 'Daniel',
      room: 'The Office Fans'
    }
    var resUser = users.addUser(user.id, user.name, user.room);
    //The first 'users' access the variable to set a new object and the second 'users' access the array in the constructor:
    expect(users.users).toEqual([user]);
  });
  //Second user test case for the 'removeUser' method:
  it('should remove a user', () => {
    var userId = '1';
    var user = users.removeUser(userId);
    //We expect to first find the user and then to be removed from the array:
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });
  //Third user test case for the 'removeUser' method:
  it('should not remove a user', () => {
    var userId = '55';
    var user = users.removeUser(userId);
    //We expect to first find the user and then to be removed from the array:
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });
  //Fourth user test case for the 'getUser' method:
  it('should find a user', () => {
    var userId = '2';
    var user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });
  //Fifth user test case for the 'getUser' method:
  it('should not find a user', () => {
    var userId = '54';
    var user = users.getUser(userId);
    expect(user).toNotExist();
  });
  //Sixth user test case for the 'getUserList' method:
  it('should return names for node course', () => {
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Mike', 'Jean']);
  });
  //Seventh user test case for the 'getUserList' method:
  it('should return names for react course', () => {
    var userList = users.getUserList('React Course');
    expect(userList).toEqual(['Daniel']);
  });
});
