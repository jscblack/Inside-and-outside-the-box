// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database();
  const mail = event.mail;
  const feedBack = event.feedBack;
  if (mail == undefined || context == undefined) {
    return {
      errCode: 13001,
      errMsg: 'Missing parameter'
    }
  }
  const res=await db.collection('feedBack').add({
    data: {
      mail: mail,
      feedBack: feedBack,
    }
  })
  return {
    errCode: 13000,
    errMsg: 'upload_feedBack:ok',
    data: res
  }
}