// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  //only for test
  // return {
  //   errCode: 32000,
  //   errMsg: 'update_viewed:ok'
  // }
  // only for test
  if (!event.mininote_id) {
    return {
      errCode: 32001,
      errMsg: 'Missing parameter'
    }
  }
  const mininote_id = event.mininote_id;
  const db = cloud.database()
  try {
    await db.collection('notes_viewed').add({
      data: {
        user: cloud.getWXContext().OPENID,
        mininote_id: mininote_id,
      }
    })
    return {
      errCode: 32000,
      errMsg: 'update_viewed:ok'
    }
  } catch (err) {
    return err
  }
}