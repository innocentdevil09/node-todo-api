const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id = '59be59dd2d64aa1c58fa540e';

// if(!ObjectID.isValid(id)){
//   console.log('ID not valid');
// };

// Todo.find({
//   _id: id
// }).then((todos) => {console.log(todos);});
//
// Todo.findOne({
//   completed: false
// }).then((todo) => {
//   console.log('Todo: ', todo);
// });
//
// Todo.findById(id).then((todo) => {
//    if (!todo){
//    return console.log('ID not found');
//    }
//   console.log('Todo: ', todo);
// }).catch((err) => console.log(err));

const {Users} = require('./../server/models/users');

var idOfUser = '59be025bfbc3862310d72e8b';

Users.findById(idOfUser).then((user1) => {
  if(!user1){
    return console.log('User not found');
  }
  console.log('User: ', user1);
}, (e) => console.log(e));
