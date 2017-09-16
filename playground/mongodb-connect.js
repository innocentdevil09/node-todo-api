// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var user = {
//   name: 'himanshu', age: 24
// };
// var {name} = user;
// console.log(name);

// MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
//   if(err){
//     return console.log('Unable to connect to database.');
//   }
//   console.log('Connection successful.');
//
//   db.collection('Todos').insertOne({
//     text: 'Something to do',
//     completed: false
//   }, (err, result) => {
//     if(err){
//       return console.log('Unable to create an entry');
//     }
//     console.log(JSON.stringify(result.ops, undefined, 2));
//   });
//
//   db.close();
// });

MongoClient.connect('mongodb://localhost:27017/Users', (err, db) => {
  if(err){
    return console.log('Unable to connect to database');
  }
  console.log('connection successful.');

  // db.collection('User1').insertOne({
  //   name: 'Himanshu',
  //   age: 25,
  //   location: 'Dehradun'
  // }, (err, result) => {
  //   if(err){
  //     console.log('Unable to insert an entry');
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });
  db.close();
});
