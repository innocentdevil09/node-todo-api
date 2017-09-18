var {mongoose} = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/todo');

Todo.remove({}).then((result) => {
  console.log('All data removed', result);
});

Todo.findOneAndRemove({_id: '59be7a8126354709cc282036'}).then((todo) => {
  console.log('Data removed: ', todo);
});

Todo.findByIdAndRemove('59be7a8126354709cc282036').then((todo) => {
  console.log('Data removed: ', todo);
});
