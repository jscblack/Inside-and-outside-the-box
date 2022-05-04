// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database();
  const note_id = event.note_id;
  if (!note_id) {
    return {
      errCode: 39001,
      errMsg: 'Missing parameter'
    }
  }

  try {
    const ret = await db.collection('user_fav').where({
      user: wxContext.OPENID,
      note: note_id,
    }).count();
    console.log(ret);
    if (ret.total === 1) {
      return {
        errCode: 39000,
        errMsg: 'chk_fav:ok has_this_fav'
      }
    } else {
      return {
        errCode: 39002,
        errMsg: 'chk_fav:ok no_this_fav'
      }
    }
  } catch (err) {
    return err
  }

}