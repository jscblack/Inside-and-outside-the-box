// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

  const wxContext = cloud.getWXContext()

  const Id = event.mininote_id
  if (!Id) {
    return {
      errCode: 26001,
      errMsg: 'Missing parameter'
    }
  }
  const db = cloud.database()

  const res = await db.collection('mininotes').where({
    cre_user: wxContext.OPENID,
    _id: Id
  }).get();
  if (res.data[0].has_pic) {
    console.log(await cloud.deleteFile({
      fileList: res.data[0].note_pic,
    }))

    await Promise.all(res.data[0].note_pic.map(async element => {
      //element 为cloudlink
      console.log(await db.collection('pic_tmp').where({
        cloudlink: element
      }).remove())
    }));
  }
  await db.collection('mininotes').where({
    cre_user: wxContext.OPENID,
    _id: Id
  }).remove();

  await db.collection('user_fav').where({
    note: Id,
  }).remove();

  await db.collection('notes_viewed').where({
    mininote_id: Id,
  }).remove();
  return {
    errCode: 26000,
      errMsg: 'delete_content:OK'
  }
}