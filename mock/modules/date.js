let Mock = require('mockjs');

var Random = Mock.Random

module.exports = Mock.mock({
  "data":{date:Random.date('yyyy-MM-dd')} 
});