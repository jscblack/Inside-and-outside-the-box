// 云函数入口文件
const cloud = require('wx-server-sdk')
const convert = require('heic-convert');
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const heicPath = event.heicPath;
  const targetName =event.targetName;
  const res = await cloud.downloadFile({
    fileID: heicPath,
  })
  const buffer = res.fileContent
  outputBuffer = await convert({
    buffer: buffer, // the HEIC file buffer
    format: 'JPEG',      // output format
    quality: 1           // the jpeg compression quality, between 0 and 1
  });
  const ret=await cloud.uploadFile({
    cloudPath: "noteImgs/"+targetName+'.jpg',
    fileContent: outputBuffer,
  })
  await cloud.deleteFile({
    fileList: [heicPath],
  })
  const result = await cloud.getTempFileURL({
    fileList: [ret.fileID],
  })

  return {
    errCode: 64000,
    errMsg: 'uploadHEIC:ok',
    data:result.fileList[0]
  }
}