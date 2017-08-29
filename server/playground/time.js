const moment = require('moment');

const createdAt = 1234;
var date = moment(createdAt);
// Month shorthand
// date.add(1, 'years').subtract(9, 'months');
// console.log(date.format('MMM Do, YYYY'));
// console.log(date.format('hh:mm a'));

const someTimestamp = moment().valueOf();
console.log(someTimestamp);

console.log(date.format('hh:mm a'));