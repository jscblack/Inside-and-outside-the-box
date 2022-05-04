// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  //const wxContext = cloud.getWXContext()
  const db = cloud.database()
  return await db.collection('user_info').where({
    _openid: cloud.getWXContext().OPENID
  }).count().then(res => {
    console.log(res.total)
    if (res.total == 1) {
      return {
        errCode: 31000,
        errMsg: 'check_usr:ok_has_usr'
      }
    } else {
      return {
        errCode: 31001,
        errMsg: 'check_usr:ok_no_usr'
      }
    }
  })
}