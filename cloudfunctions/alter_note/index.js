// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db=cloud.database()
  const note_id=event.note_id;
  if(note_id==undefined){
    return {
      errCode: 48001,
      errMsg: 'Missing parameter'
    }
  }
  //如果该纸条存在被举报现象则不能解锁
  const locked= await db.collection('abuseNotes').where({
    noteid:note_id
  }).count();
  // console.log(locked.total);
  if(locked.total>=1){
    return {
      errCode: 48002,
      errMsg: 'alter_note:fail note has been reported abused'
    }
  }
  await db.collection('mininotes').where({
    cre_user:wxContext.OPENID,
    _id:note_id
  }).update({
    data: {
      mininote_type: db.command.bit({
        xor: 1
      })
    }
  })
  return {
    errCode: 48000,
    errMsg: 'alter_note:ok'
  }
}