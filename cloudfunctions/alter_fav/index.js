// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database();
  const note_id = event.note_id;
  const opr = event.oper; //1 表示加入收藏 2表示取消收藏
  console.log(event);
  if (!note_id || !opr) {
    return {
      errCode: 38001,
      errMsg: 'Missing parameter'
    }
  }
  if (opr === 1) {
    try {
      const ret = await db.collection('user_fav').where({
        user: wxContext.OPENID,
        note: note_id,
      }).count();
      console.log(ret);
      if (ret.total === 0) {
        await db.collection('user_fav').add({
          data: {
            user: wxContext.OPENID,
            note: note_id,
          }
        });
        await db.collection('mininotes').where({
            _id: note_id
          })
          .update({
            data: {
              mininote_favored: db.command.inc(1)
            }
          })
      }
      return {
        errCode: 38000,
        errMsg: 'add_fav:ok'
      }
    } catch (err) {
      return err
    }
  } else if (opr === 2) {
    try {
      const ret = await db.collection('user_fav').where({
        user: wxContext.OPENID,
        note: note_id,
      }).count();
      console.log(ret);
      if (ret.total === 1) {
        await db.collection('user_fav').where({
          user: wxContext.OPENID,
          note: note_id,
        }).remove();
        await db.collection('mininotes').where({
            _id: note_id
          })
          .update({
            data: {
              mininote_favored: db.command.inc(-1)
            }
          })
      }
      return {
        errCode: 38000,
        errMsg: 'delete_fav:ok'
      }
    } catch (err) {
      return err
    }
  }
}