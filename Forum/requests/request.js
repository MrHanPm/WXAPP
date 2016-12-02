const UT = require( '../util/util.js' );
const API = require( './api.js' );

const APP = getApp();

/**
 * 网络请求方法
 * @param method {get，post等} 请求方法
 * @param url {string} 请求url
 * @param data {object} 参数
 * @param successCallback {function} 成功回调函数
 * @param errorCallback {function} 失败回调函数
 * @param completeCallback {function} 完成回调函数
 * @returns {void}
 */
function xhr( method, url, data, successCallback, errorCallback, completeCallback ) {
    if( APP.debug ) {
        console.log( 'requestData url: ', url )
    }
    method = method ? method.toUpperCase() : 'GET'
    wx.request({
        url: url,
        data: data,
        header: { 'Content-Type': 'application/json' },
        method: method,
        success: function( res ) {
            if( APP.debug ) {
                console.log( 'response data: ', res )
            }
            if( res.statusCode == 200 )
                UT.isFunction( successCallback ) && successCallback( res.data )
            else
                UT.isFunction( errorCallback ) && errorCallback()
        },
        fail: function() {
            UT.isFunction( errorCallback ) && errorCallback()
        },
        complete: function() {
            UT.isFunction( completeCallback ) && completeCallback()
        }
    });
}
/**---------------BIND-------------------**/
// 获取验证码
// function getPhoneMsg(data, susCb, errCb, comCb ) {
//     xhr(null, API.getPhoneMsg(), data, susCb, errCb, comCb)
// }
// //验证码登录
// function getPhoneLog(data, susCb, errCb, comCb ) {
//     xhr(null, API.getPhoneLog(), data, susCb, errCb, comCb)
// }
// //手机号密码登录
// function bindTelPwd(data, susCb, errCb, comCb ) {
//     xhr(null, API.bindTelPwd(), data, susCb, errCb, comCb)
// }

/**---------------帖子-------------------**/
// 十大热贴
// page    int 否   页码
function getHotTen(data, susCb, errCb, comCb ) {
    xhr(null, API.getHotTen(), data, susCb, errCb, comCb)
}

// 最新帖子列表
// page    int 否   页码
function getNewList(data, susCb, errCb, comCb ) {
    xhr(null, API.getNewList(), data, susCb, errCb, comCb)
}

// 俱乐部帖子列表(热门车型~关注的)
// tagid   int 是   俱乐部id
// page    int 否   页码
function getHotList(data, susCb, errCb, comCb ) {
    xhr(null, API.getHotList(), data, susCb, errCb, comCb)
}

// 帖子页
// tid     int 是   帖子id
// page    int 否   页码
function getDetail(data, susCb, errCb, comCb ) {
    xhr(null, API.getDetail(), data, susCb, errCb, comCb)
}
// 帖子点赞
// tid int 是   帖子id
// pid int 否   有则为回帖点赞、没有则为主贴点赞
function getLaud(data, susCb, errCb, comCb ) {
    xhr(null, API.getLaud(), data, susCb, errCb, comCb)
}


/**---------------用户-------------------**/
// 获取用户信息接口
// newbuddyid  int 是   好友uid
function getUserInfo(data, susCb, errCb, comCb ) {
    xhr(null, API.getUserInfo(), data, susCb, errCb, comCb)
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
