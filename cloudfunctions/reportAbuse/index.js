// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database();
  const noteid = event.noteid;
  const abuseType = event.abuseType;
  console.log(event);
  if (noteid == undefined) {
    return {
      errCode: 12001,
      errMsg: 'Missing parameter'
    }
  }
  await db.collection('abuseNotes').add({
    data: {
      noteid: noteid,
      abuseType: abuseType,
    }
  })
  //暂时给该纸条上锁
  await db.collection('mininotes').where({
    _id:noteid
  }).update({
    data: {
      mininote_type: 1
    }
  })
  return {
    errCode: 12000,
    errMsg: 'reportAbuse:ok'
  }

}