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
require('./config/config');


const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {Users} = require('./models/users');
var {authenticate} = require('./middleware/authenticate');

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

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }

    res.send({todo: todo});
  }, (err) => {
    res.status(400).send();
  });
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }

    res.send({todo});
  }, (err) => {
    res.status(400).send(err);
  });
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && (body.completed)){
    body.completedAt = new Date().getTime();
  }else {
    body.completed = false;
    body.completedAt = 00000;
  }

  Todo.findByIdAndUpdate(id,
    {$set: body},
    {new: true}).then((todo) => {
      if(!todo){
        return res.status(404).send();
      }
      res.send({todo});
    }, (err) => {res.status(400).send()});
});

//--------------------------------------------------
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  var user = new Users(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }, (err) => {
    res.status(400).send(err);
  }).then((token) => {
    res.header('x-auth', token).send(user);
  });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  Users.findByCredentials(body.email, body.password). then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});

module.exports = {
  app: app
};
