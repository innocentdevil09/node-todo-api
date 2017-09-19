const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {Users} = require('./../../models/users');

var userOneId = new ObjectID();
var userTwoId = new ObjectID();
var users = [{
  _id: userOneId,
  email: 'shivani@example.com',
  password: 'password!',
  tokens: [{
    token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString(),
    access: 'auth'
  }]
}, {
  _id: userTwoId,
  email: 'shivani1@example.com',
  password: 'password!',
  tokens: [{
    token: jwt.sign({_id: userTwoId, access: 'auth'}, 'abc123').toString(),
    access: 'auth'
  }]
}];

var todos = [{
  _id: new ObjectID(),
  text: 'First test todo.',
  _creator: userOneId
}, {
  _id: new ObjectID(),
  text: 'Second test todo.',
  _creator: userTwoId
}];

var populateTodos = (done) => {
  Todo.remove({}).then(() => {
    // console.log('Database is empty');
    return Todo.insertMany(todos);
  }).then(() => done());
};

var populateUsers = (done) => {
  Users.remove({}).then(() => {
    var userOne = new Users(users[0]).save();
    var userTwo = new Users(users[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};
