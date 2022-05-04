// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
// 云函数入口函数
exports.main = async (event, context) => {
  //event
  //word_content 必须有
  //pic_num 0 为无图片 >1 为有图片 <0 非法
  //pic_content 如果有 cloudlink  cloud://*.png/jpg
  //mininote_type 必含 0公开 1私有
  //23001 请求参数有误
  //23002 用户存在风险 禁止发布内容
  //87014 文字存在敏感内容
  //87014 图片存在敏感内容

  //run user risky check
  // const wxcontext=cloud.getWXContext()
  // try {
  //   const res = await cloud.openapi.riskControl.getUserRiskRank({
  //     appid: wxcontext.APPID,
  //     openid: wxcontext.OPENID,
  //     scene: 1,
  //     clientIp: wxcontext.CLIENTIP
  //   })
  //   if (res.riskRank >= 3) {
  //     return {
  //       errCode: 23002,
  //       errMsg: 'Risky user'
  //     }
  //   }
  // } catch (err) {
  //   return err
  // }

  console.log(event)
  let pass_pic = 0;
  let fail_pic = 0;
  if (!(event.word_content && ((event.pic_num == 0 && event.pic_content == null) || (event.pic_content != null && event.pic_content.length == event.pic_num)) && event.mininote_type <= 1 && event.mininote_type >= 0)) {
    return {
      errCode: 23001,
      errMsg: 'Missing parameter'
    }
  }
  const wxContext = cloud.getWXContext()
  const has_pic = event.pic_num >= 1 ? true : false
  //run risky msg check
  try {
    await cloud.openapi.security.msgSecCheck({
      content: event.word_content
    })
    console.log('msg ok')
  } catch (err) {
    return err
  }
  //2021.5.9 already compeleted in chk_imgsec
  // //run risky img check
  // if (event.pic_num >= 1) {
  //   //mul_thread
  //   await Promise.all(event.pic_content.map(async element => {
  //     const pic_type = element.substring(element.lastIndexOf('.') + 1) == 'jpg' ? 'jpeg' : element.substring(element.lastIndexOf('.') + 1);
  //     console.log(element)
  //     const res_p = await cloud.downloadFile({
  //       fileID: element,
  //     })

  //     const p_buffer = res_p.fileContent
      
  //     try {
  //       await cloud.openapi.security.imgSecCheck({
  //         media: {
  //           contentType: 'image/' + pic_type,
  //           value: Buffer.from(p_buffer),
  //         }
  //       })
  //       console.log('img ok '+element)
  //       pass_pic++;
  //     } catch (err) {
  //       console.log(err)
  //       console.log('img fail '+element)
  //       fail_pic++;
  //     }
  //   }));
  // }
  // if (fail_pic >= 1) {
  //   return {
  //     errCode: 87014,
  //     errMsg: 'risky content'
  //   }
  // }
  // console.log(pass_pic)
  // console.log(fail_pic)
  const db = cloud.database()
  try {
    await db.collection('mininotes').add({
      data: {
        cre_user: wxContext.OPENID,
        cre_time: db.serverDate(),
        note_words: event.word_content,
        has_pic: has_pic,
        note_pic: event.pic_content,
        mininote_type: event.mininote_type,
        mininote_favored:0
      }
    })
    if(has_pic){
      await Promise.all(event.pic_content.map(async element => {
        //element 为cloudlink
        await db.collection('pic_tmp').where({
          cloudlink:element
        }).update({
          data: {
            used: true
          }
        })
      }));
    }
    return {
      errCode: 23000,
      errMsg: 'upload_content:ok'
    }
  } catch (err) {
    return err
  }
}