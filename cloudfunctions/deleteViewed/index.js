// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  await db.collection('notes_viewed').where({
      user: cloud.getWXContext().OPENID,
  }).remove();
  return {
    errCode: 11000,
    errMsg: 'delete_viewed:ok'
  }
}