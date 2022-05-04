// delete_orphan 清除孤儿图片
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  // // alter record
  // const db = cloud.database()
  // const res = await db.collection('mininotes')
  // .where({
  // })
  // .update({
  //   data:{
  //     mininote_favored:0
  //   }
  // })
  // console.log(res);


  // remove record
  // const db = cloud.database()
  // const res = await db.collection('pic_tmp').where({
  //   cre_user: db.command.not(db.command.eq(wxContext.OPENID))
  //   // cre_user:wxContext.OPENID
  // }).remove();
  // console.log(res);

  //remove orphan
  const db = cloud.database()
  const res = await db.collection('pic_tmp').where({
    used: false
  }).get();
  console.log(res.data);
  if (res.data.length) {
    await Promise.all(res.data.map(async element => {
      const fileIDs = [element.cloudlink]
      console.log(await cloud.deleteFile({
        fileList: fileIDs,
      }))
    }));
    console.log(await db.collection('pic_tmp').where({
      used: false
    }).remove());
  }
  return 'ok'
}