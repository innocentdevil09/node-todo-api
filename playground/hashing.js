const {SHA256} = require('crypto-js');

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
//
// // console.log(hash);
//
// var data = {
//   id: 4
// };
// var token = {
//   data: data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };
// // console.log(`Token: ${token.hash}`);
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// if(resultHash === token.hash){
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed. Do not trust!');
// }

const jwt = require('jsonwebtoken');

var data = {
  id: 10
};
var token = jwt.sign(data, '123qwe');
console.log(token);
var decoded = jwt.verify(token, '123qwe');
console.log('Decoded ', decoded);