// 云函数入口文件
// 写入用户数据
const cloud = require('wx-server-sdk')
const request = require('request')
const fs = require('fs')
const path = require('path')
cloud.init()
// 云函数入口函数

async function solver(flag,event,linker) {
    const db = cloud.database();
    if (flag == 1) {
        console.log('upd')
        await db.collection('user_info').where({
            _openid: cloud.getWXContext().OPENID
        }).update({
            data: {
                _nickname: event.user_nickname,
                _favicon: linker
            }
        })
    } else {
        console.log('rew')
        await db.collection('user_info').add({
            data: {
                _openid: cloud.getWXContext().OPENID,
                _nickname: event.user_nickname,
                _favicon: linker,
                _cre_time: db.serverDate()
            }
        })
    }
    
}
async function solve(linker, event) {
    console.log(linker)
    const tmp_pic=await cloud.getTempFileURL({
        fileList: [linker],
    })
    linker=tmp_pic.fileList[0].tempFileURL
    console.log(linker)
    const db = cloud.database();
    // console.log(db.collection('user_info').where({
    //     _openid: cloud.getWXContext().OPENID
    // }).count())
    await db.collection('user_info').where({
        _openid: cloud.getWXContext().OPENID
    }).count().then(res => {
        solver(res.total,event,linker)
    })
}
exports.main = async (event, context) => {
    // open_id 用户不可见
    // user_nickname string 必须
    //  user_favicon string 必须 需提前上传用户头像cloudlink
    // cre_time 注册日期
    console.log(event)
    if (!event.user_nickname || !event.user_favicon) {
        return {
            errCode: 29001,
            errMsg: 'Missing parameter'
        }
    }
    const options = {
        url: event.user_favicon,
        encoding: null,
        headers: {
            "content-type": "application/octet-stream",
        },
    };
    request(options, function (error, response, body) {
        //转储
        console.log('a')
        cloud.uploadFile({
            cloudPath: 'usr_favicon/' + cloud.getWXContext().OPENID + '.gif',
            fileContent: body,
        }).then(res => {
            console.log(res);
            solve(res.fileID, event);
        })
    })
    return {
        errCode: 29000,
        errMsg: 'upload_usr:ok'
    } 
}