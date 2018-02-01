let Mock = require('mockjs');

var Random = Mock.Random

  // 1 => 单选
  // 3 => 多选
  // 6 => 文本
  // 7 => 长文本
module.exports = Mock.mock({
  "data|20": [
      {
      'id|+1':1,
      'type|1':['1', '3', '6', '7'],
      'title':'@ctitle(3,50)',
        'option|4': [
          {
              'key|+1':Random.range(4),
              'value':'@ctitle(3,40)'
          }
        ]
      }
    ] 
});