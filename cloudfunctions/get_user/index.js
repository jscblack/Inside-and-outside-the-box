// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db=cloud.database();
  const res=await db.collection('user_info').where({
    _openid: wxContext.OPENID
  }).get();
  return {
    errCode: 68000,
    errMsg: 'get_user:ok',
    data:res.data[0]
  }
}