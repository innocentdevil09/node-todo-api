// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  //deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat Dinner'}).then((result) => {
  //   console.log(result);
  // });

  //deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat Dinner'}).then((result) => {
  //   console.log(result);
  // });

  //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({_id: new ObjectID('59bd0116da567f1de020fea9')})
  // .then((result) => {
  //   console.log(result);
  // });

//db.close();
});

MongoClient.connect('mongodb://localhost:27017/Users', (err, db) => {
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('User1').deleteMany({name: 'Himanshu'}).then((result) => {
  //   console.log(result);
  // });
  db.collection('User1').findOneAndDelete({_id: new ObjectID('59bd1c73e5c056a099c48c9a')})
  .then((result) => {
    console.log(result);
  });

  //db.close();
});
