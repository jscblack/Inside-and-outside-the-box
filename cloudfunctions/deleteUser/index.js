// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  //先删viewed
  const db = cloud.database()
  await db.collection('notes_viewed').where({
    user: wxContext.OPENID,
  }).remove();
  await db.collection('mininotes').where({
    cre_user: wxContext.OPENID,
  }).remove();
  await db.collection('user_fav').where({
    user: wxContext.OPENID,
  }).remove();
  await db.collection('user_info').where({
    _openid: wxContext.OPENID,
  }).remove();
  return {
    errCode: 11111,
    errMsg: 'delete_user:OK'
  }
}