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
//获取验证码
function getPhoneMsg(data, susCb, errCb, comCb ) {
    xhr(null, API.getPhoneMsg(), data, susCb, errCb, comCb)
}
//验证码登录
function getPhoneLog(data, susCb, errCb, comCb ) {
    xhr(null, API.getPhoneLog(), data, susCb, errCb, comCb)
}
/**---------------USER-------------------**/



/**---------------BOSS-------------------**/


/**---------------FORM-------------------**/

module.exports = {
    getPhoneMsg: getPhoneMsg,
    getPhoneLog: getPhoneLog
};
