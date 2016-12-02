const URL = require('../config.js')


/**---------------BIND-------------------**/
// // 获取验证码
// function getPhoneMsg() {
//     return URL + 'User/SendSMSYanMa.aspx'
// }
// // 验证码登录
// function getPhoneLog() {
//     return URL + 'WXXiaoChengXu/XiaoChengXuBind.aspx'
// }
// // 手机号密码登录
// function bindTelPwd() {
//     return URL + 'WXXiaoChengXu/XiaoChengXuBind.aspx'
// }

/**---------------帖子-------------------**/

// 十大热贴
function getHotTen() {
    return URL + 'interface/app/wxapp.php?action=thread&method=topten'
}

// 最新帖子列表
function getNewList() {
    return URL + 'interface/app/wxapp.php?action=thread&method=lastest'
}

// 俱乐部帖子列表(热门车型~关注的)
function getHotList() {
    return URL + 'interface/app/wxapp.php?action=thread&method=clubThreads'
}

// 帖子页
function getDetail() {
    return URL + 'interface/app/wxapp.php?action=thread&method=detail&origin=wxapp'
}
// 帖子点赞
function getLaud() {
    return URL + 'interface/app/wxapp.php?action=thread&method=recommend'
}
// POST -----发帖----回帖-----上传图片-----关注车型论坛    
function postWrite() {
    return URL + 'interface/app/wxapp.php'
}


/**---------------用户-------------------**/
// 获取用户信息接口
function getUserInfo() {
    return URL + 'interface/app/wxapp.php?type=user&action=UserInfo'
}

// 我关注的车型列表
function getCarTypeList() {
    return URL + 'interface/app/wxapp.php?type=user&action=UserInfo'
}

/**---------------FORM-------------------**/




module.exports = {
    getHotTen: getHotTen,
    getNewList: getNewList,
    getHotList: getHotList,
    getDetail: getDetail,
    getLaud: getLaud,
    getUserInfo: getUserInfo
};
