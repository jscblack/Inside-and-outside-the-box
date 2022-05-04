// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  //limit_count 数值


  let limit_count = 100
  if (event.limit_count) {
    limit_count = event.limit_count
  }
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  //console.log(wxContext.OPENID)
  const nmret = await db.collection('user_info').where({
    _openid: wxContext.OPENID
  }).get()

  const cur_nickname = ((nmret.data.length == 1) ? nmret.data[0]._nickname : "箱里箱外用户");
  const cur_favicon = ((nmret.data.length == 1) ? nmret.data[0]._favicon : "https://6d65-meet-the-world-2g7kshiy287c49fe-1305360411.tcb.qcloud.la/usr_favicon/default.jpg");

  let res = await db.collection('mininotes').limit(limit_count).where({
    cre_user: wxContext.OPENID
  }).orderBy('cre_time', 'desc').get()
  //console.log(res.data)
  if (res.data.length == 0) {
    return {
      errCode: 13601,
      errMsg: 'No available mininotes'
    }
  }
  await Promise.all(res.data.map(async element => {
    element.cre_user = cur_nickname
    element.cre_user_favicon = cur_favicon
    if (element.note_pic.length >= 1) {
      const remote_pic = element.note_pic;
      const tmp_pic = await cloud.getTempFileURL({
        fileList: remote_pic,
      })
      // console.log(tmp_pic)
      for (let index = 0; index < element.note_pic.length; index++) {
        element.note_pic[index] = tmp_pic.fileList[index].tempFileURL
      }
    }
  }));
  return {
    'errCode': 13600,
    'errMsg': 'pull_self_OK',
    'data': res.data
  }
}