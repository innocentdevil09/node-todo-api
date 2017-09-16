// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/Users', (err, db) => {
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  db.collection('User1').find({name: 'Himanshu'}).toArray().then(
    (docs) => {
      console.log(JSON.stringify(docs, undefined, 2))
    }, (err) => {
      console.log('Unable to find data', err);
    });
});

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  db.collection('Todos').find(
      {_id: new ObjectID('59bd0116da567f1de020fea9')})
    .toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to find data', err);
  });

  // db.collection('Todos').count().then((count) => {
  //   console.log('Todos');
  //   console.log(`Count: ${count}`);
  // }, (err) => {
  //   console.log('Unable to find data', err);
  // });

  // db.collection('Todos').find({completed: true}).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to find data', err);
  // });

  // db.collection('Todos').find().toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to find data', err);
  // });
});
