const URL = require('../config.js')
var APPS = getApp()
// const SESSIONID = () => { return APPS.SESSIONID}
/**---------------BIND-------------------**/
// 获取验证码
function getPhoneMsg() {
    return URL + 'interface/app/wxapp.php?action=sms&method=sendCaptcha&sendtype=0&session_id=' + APPS.SESSIONID
}
// // 验证码登录
// function getPhoneLog() {
//     return URL + 'WXXiaoChengXu/XiaoChengXuBind.aspx'
// }
// // 手机号密码登录
// function bindTelPwd() {
//     return URL + 'WXXiaoChengXu/XiaoChengXuBind.aspx'
// }
/**---------------TOOL-------------------**/
// 车型列表
function getTrunk() {
    return URL + 'interface/app/wxapp.php?action=Club&origin=wxapp&type=empty&session_id=' + APPS.SESSIONID
}
/**---------------帖子-------------------**/

// 十大热贴
function getHotTen() {
    return URL + 'interface/app/wxapp.php?action=thread&method=topten&session_id=' + APPS.SESSIONID
}
// 精华
function getElite() {
    return URL + 'interface/app/wxapp.php?action=thread&method=best&session_id=' + APPS.SESSIONID
}

// 最新帖子列表
function getNewList() {
    return URL + 'interface/app/wxapp.php?action=thread&method=lastest&session_id=' + APPS.SESSIONID
}

// 俱乐部帖子列表(热门车型~关注的)
function getHotList() {
    return URL + 'interface/app/wxapp.php?action=thread&method=clubThreads&session_id=' + APPS.SESSIONID
}

// 帖子页
function getDetail() {
    return URL + 'interface/app/wxapp.php?action=thread&method=detail&origin=wxapp&session_id=' + APPS.SESSIONID
}
// 帖子点赞
function getLaud() {
    return URL + 'interface/app/wxapp.php?action=thread&method=recommend&session_id=' + APPS.SESSIONID
}
// 多功能接口-----发帖----回帖-----上传图片-----关注车型论坛    
function postWrite() {
    return URL + 'interface/app/wxapp.php'
}


/**---------------用户-------------------**/
// 获取用户信息接口
function getUserInfo() {
    return URL + 'interface/app/wxapp.php?type=user&action=UserInfo&session_id=' + APPS.SESSIONID
}
// 用户主贴  and  用户回帖
function getToForum() {
    return URL + 'interface/app/wxapp.php?action=member&session_id=' + APPS.SESSIONID
}

// 我关注的车型列表
function getCarTypeList() {
    return URL + 'interface/app/wxapp.php?type=empty&action=club&method=getFavList&operation=follow&session_id=' + APPS.SESSIONID
}

// 签到
function setSign() {
    return URL + 'interface/app/wxapp.php?action=member&method=sign&step=sign&session_id=' + APPS.SESSIONID
}

// 关注好友、取消关注接口
function addDelFriend() {
    return URL + 'interface/app/wxapp.php?action=AddFriend&type=empty&session_id=' + APPS.SESSIONID
}

// 关注车型论坛
function addFavorties() {
    return URL + 'interface/app/wxapp.php?action=AddFavorties&type=empty&idtype=follow&session_id=' + APPS.SESSIONID
}
/**---------------FORM-------------------**/




module.exports = {
    getHotTen: getHotTen,
    getElite: getElite,
    getNewList: getNewList,
    getHotList: getHotList,
    getDetail: getDetail,
    getLaud: getLaud,
    getTrunk: getTrunk,
    getToForum: getToForum,
    getUserInfo: getUserInfo,
    setSign: setSign,
    addDelFriend: addDelFriend,
    getCarTypeList: getCarTypeList,
    addFavorties: addFavorties,
    getPhoneMsg: getPhoneMsg,
    postWrite: postWrite
};
