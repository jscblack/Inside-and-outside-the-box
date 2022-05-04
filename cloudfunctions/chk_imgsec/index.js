// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  //url
  const url = event.url;
  if (!url) {
    return {
      errCode: 52001,
      errMsg: 'Missing parameter'
    }
  }
  const pic_type = url.substring(url.lastIndexOf('.') + 1) == 'jpg' ? 'jpeg' : url.substring(url.lastIndexOf('.') + 1);
  console.log(url)
  const res_p = await cloud.downloadFile({
    fileID: url,
  })
  const p_buffer = res_p.fileContent
  await cloud.deleteFile({
    fileList: [url],
  })
  try {
    await cloud.openapi.security.imgSecCheck({
      media: {
        contentType: 'image/' + pic_type,
        value: Buffer.from(p_buffer),
      }
    })
    console.log('img ok ' + url)
    return {
      errCode: 52000,
      errMsg: 'chk_imgsec:ok'
    }

  } catch (err) {
    console.log(err)
    console.log('img fail ' + url)
    return {
      errCode: 52002,
      errMsg: 'chk_imgsec:fail'
    }
  }
}