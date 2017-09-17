// var mongoose = require('mongoose');
//
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp');
//
// var Todo = mongoose.model('Todo', {
//   text: {
//     type: String,
//     default: 'Default value',
//     required: true,
//     minlength: 1,
//     trim: true
//   },
//   completed: {type: Boolean, default: false},
//   completedAt: {type: Number, default: 00000}
// });
//
// // var newTodo = new Todo({
//   // text: 'Eat breakfast'
// // });
//
// // var todo2 = new Todo({
// //   text: 'Feed the dog',
// //   completed: true,
// //   completedAt: 123
// // });
// //
// // todo2.save().then((doc) => {
// //   console.log(doc);
// // },
// //  (err) => {
// //    console.log('Unable to save', err);
// //  });
//
// var Users = mongoose.model('Users', {
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     minlength: 1
//   }
// });
//
// var user1 = new Users({
//   email: 'whosewho@whocares.com'
// });
//
// user1.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (err) => {
//   console.log('Unable to save user', err);
// });

var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {Users} = require('./models/users');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo(
    {text: req.body.text,
      completed: req.body.completed,
      completedAt: req.body.completedAt});

  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });

  // console.log(req.body);
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({
      todos: todos
    });
  }, (err) => {res.status(400).send(err)});
});

app.listen(3000, () => {
  console.log('Server running at port 3000');
});

module.exports = {
  app: app
};