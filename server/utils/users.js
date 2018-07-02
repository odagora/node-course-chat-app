[{
  id: '',
  name: '',
  room: ''
}];
//ES6 Classes, similar that in php OOP:
// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription () {
//     return `${this.name} is ${this.age} year(s) old.`
//   }
// }
//
// var me = new Person('Daniel', 35);
// var description = me.getUserDescription();
// console.log(description);

//Application:
class Users {
  constructor () {
    this.users = [];
  }
  //addUser(id, name, room):
  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  //removeUser(id):
  removeUser (id) {
    var user = this.getUser(id);
    if (user) {
      //we make an array of the other users that don't match the 'id' property:
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }
  //getUser(id):
  getUser (id) {
    return this.users.filter((user) => user.id === id)[0];
  }
  //getUserList(room)
  getUserList (room) {
    //We use the filter method to find the users in a room:
    var users = this.users.filter((user) => {
      return user.room === room;
    });
    //Next we convert the results to a string and return only their names with 'map' option:
    var namesArray = users.map((user) => {
      return user.name;
    });
    return namesArray;
  }
}

module.exports = {Users};
