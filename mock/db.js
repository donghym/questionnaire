//引入mockjs文件
let Mock  = require('mockjs');
let Random = Mock.Random;

let questionlist = require('./modules/question.js');
let date         = require('./modules/date.js');
let data = {
	questionlist:questionlist.data,
	date:date.data
}
console.log(questionlist);
module.exports   = function() {
  return data
}