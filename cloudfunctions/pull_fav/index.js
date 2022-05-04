// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database();
  const _ = db.command;
  const $ = db.command.aggregate;
  //得到用户收藏
  try {
    let ret = await db.collection('user_fav')
      .aggregate()
      .match({
        user: cloud.getWXContext().OPENID,
      })
      .project({
        _id: 0,
        note: 1,
      })
      .lookup({
        from: 'mininotes',
        let: {
          ori_noteid: '$note',
        },
        pipeline: $.pipeline()
          .match(_.expr($.and([
            $.eq(['$_id', '$$ori_noteid']),
            $.eq(['$mininote_type', 0])
          ])))
          .done(),
        as: 'det',
      })
      .match({
        det: _.neq([])
      })
      .end();
    console.log(ret);
    await Promise.all(ret.list.map(async element => {
      if (element.det.length == 0) {
        delete element;
      } else {
        nmret = await db.collection('user_info').where({
          _openid: element.det[0].cre_user
        }).get()
        element.det[0].cre_user = (nmret.data.length == 1) ? nmret.data[0]._nickname : "箱里箱外用户"
        element.det[0].cre_user_favicon = (nmret.data.length == 1) ? nmret.data[0]._favicon : "https://6d65-meet-the-world-2g7kshiy287c49fe-1305360411.tcb.qcloud.la/usr_favicon/default.jpg"
        const remote_pic = element.det[0].note_pic;
        if (remote_pic.length >= 1) {
          const tmp_pic = await cloud.getTempFileURL({
            fileList: remote_pic,
          })
          for (let index = 0; index < element.det[0].note_pic.length; index++) {
            element.det[0].note_pic[index] = tmp_pic.fileList[index].tempFileURL
          }
        }
        element.det = element.det[0];
      }

    }));
    return {
      errCode: 41000,
      errMsg: 'pull_fav:ok',
      data: ret.list,
    }
  } catch (err) {
    return err
  }

}