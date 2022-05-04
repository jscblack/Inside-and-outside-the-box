// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
// 云函数入口函数
exports.main = async (event, context) => {
  //cloudlink string 必须
  console.log(event)
  if (!event.cloud_link) {
    return {
      errCode: 22001,
      errMsg: 'Missing parameter'
    }
  }
  const db = cloud.database()
  try {
    await db.collection('pic_tmp').add({
      data: {
        user: cloud.getWXContext().OPENID,
        cloudlink: event.cloud_link,
        used:false
      }
    })
    return {
      errCode: 22000,
      errMsg: 'update_record:ok'
    }
  } catch (err) {
    return err
  }
}