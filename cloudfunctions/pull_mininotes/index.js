// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  //从数据库随机获取一个非自己的公开小纸条
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command
  const $ = db.command.aggregate
  const res = await db.collection('mininotes')
    .aggregate()
    .match({
      cre_user: db.command.not(db.command.eq(wxContext.OPENID)),
      mininote_type: db.command.eq(0),
    })
    .project({
      _id: 1
    })
    .lookup({
      from: 'notes_viewed',
      let: {
        ori_noteid: '$_id',
      },
      pipeline: $.pipeline()
        .match(_.expr($.and([
          $.eq(['$user', wxContext.OPENID]),
          $.eq(['$mininote_id', '$$ori_noteid'])
        ])))
        .done(),
      as: 'viewed',
    })
    .match({
      viewed: _.eq([])
    })
    .sample({
      size: 1
    })
    .end();
  console.log(res);
  if(res.list.length==0){
    //抽干了
    return {
      errCode: 14602,
      errMsg: 'pull_mininotes:empty notes',
    }
  }
  let ret = await db.collection('mininotes').where({
    _id: res.list[0]._id
  }).get();

  ret = ret.data[0];
  if (ret.has_pic) {
    const remote_pic = ret.note_pic;
    const tmp_pic = await cloud.getTempFileURL({
      fileList: remote_pic,
    })
    for (let index = 0; index < ret.note_pic.length; index++) {
      ret.note_pic[index] = tmp_pic.fileList[index].tempFileURL
    }
  }

  nmret = await db.collection('user_info').where({
    _openid: ret.cre_user
  }).get()

  ret.cre_user = (nmret.data.length == 1) ? nmret.data[0]._nickname : "箱里箱外用户"
  ret.cre_user_favicon = (nmret.data.length == 1) ? nmret.data[0]._favicon : "https://6d65-meet-the-world-2g7kshiy287c49fe-1305360411.tcb.qcloud.la/usr_favicon/default.jpg"

  return {
    errCode: 14600,
    errMsg: 'pull_mininotes:ok',
    data: ret
  }
}