// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
//   if(err){
//     return console.log('Unable to connect to MongoDB server');
//   }
//   console.log('Connected to MongoDB server');
//
//   db.collection('Todos').findOneAndUpdate(
//     {text: 'Eat Dinner'}, {$set: {completed: true}}, {returnOriginal : false})
//     .then((result) => {
//       console.log(result);
//     });
//     //db.close();
// });

MongoClient.connect('mongodb://localhost:27017/Users', (err, db) => {
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  db.collection('User1').findOneAndUpdate(
    {_id: new ObjectID('59bd1c5fe5c056a099c48c92')},
      {$set: {name: 'Himanshu'},
       $inc: {age: 2}
     },
      {returnOriginal: false})
  .then((result) => {
    console.log(result);
  });
});
