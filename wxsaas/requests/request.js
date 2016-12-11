const UT = require( '../util/util.js' )
const API = require( './api.js' )
const APP = getApp()

// 退出
function loginOut(data, susCb, errCb, comCb ) {
    xhr(null, API.loginOut(), data, susCb, errCb, comCb)
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
// 销售的品牌
function addBrand(data, susCb, errCb, comCb ) {
    xhr(null, API.addBrand(), data, susCb, errCb, comCb)
}
// 账号登录
function loginIn(data, susCb, errCb, comCb ) {
    xhr(null, API.loginIn(), data, susCb, errCb, comCb)
}
// 创建用户
function addUser(data, susCb, errCb, comCb ) {
    xhr(null, API.addUser(), data, susCb, errCb, comCb)
}
/**---------------USER-------------------**/
// 添加收藏
function changeStatus(data, susCb, errCb, comCb ) {
    xhr(null, API.changeStatus(), data, susCb, errCb, comCb)
}
// 获取联系人列表
function getCluesList(data, susCb, errCb, comCb ) {
    xhr(null, API.getCluesList(), data, susCb, errCb, comCb)
}
// 获取最新线索列表
function getRobList(data, susCb, errCb, comCb ) {
    xhr(null, API.getRobList(), data, susCb, errCb, comCb)
}
// 抢线索
function robCustomer(data, susCb, errCb, comCb ) {
    xhr(null, API.robCustomer(), data, susCb, errCb, comCb)
}
// 更新联系人时间
function upDateClueTime(data, susCb, errCb, comCb ) {
    xhr(null, API.upDateClueTime(), data, susCb, errCb, comCb)
}
/**-------------PUBLIC--------------*/
// 初始化加载
function getAllUrl(data, susCb, errCb, comCb ) {
    xhr(null, API.getAllUrl(), data, susCb, errCb, comCb)
}
// 收藏/最近联系人
function getCustomerList(data, susCb, errCb, comCb ) {
    xhr(null, API.getCustomerList(), data, susCb, errCb, comCb)
}
// 公共线索池
function allCluesList(data, susCb, errCb, comCb ) {
    xhr(null, API.allCluesList(), data, susCb, errCb, comCb)
}
// 线索详情里面的
function changeClueStatus(data, susCb, errCb, comCb ) {
    xhr(null, API.changeClueStatus(), data, susCb, errCb, comCb)
}
// 线索详情
function getCluesDetail(data, susCb, errCb, comCb ) {
    xhr(null, API.getCluesDetail(), data, susCb, errCb, comCb)
}
// 跟进记录列表
function getClueUpList(data, susCb, errCb, comCb ) {
    xhr(null, API.getClueUpList(), data, susCb, errCb, comCb)
}
/**---------------BOSS-------------------**/
/**---------------FORM-------------------**/
// 修改密码
function changePwd(data, susCb, errCb, comCb ) {
    xhr(null, API.changePwd(), data, susCb, errCb, comCb)
}
// 提意见
function reedBack(data, susCb, errCb, comCb ) {
    xhr(null, API.reedBack(), data, susCb, errCb, comCb)
}
// 添加线索
function addClues(data, susCb, errCb, comCb ) {
    xhr('post', API.addClues(), data, susCb, errCb, comCb)
}
// 添加跟进纪录
function addClueFollowUp(data, susCb, errCb, comCb ) {
    xhr('post', API.addClueFollowUp(), data, susCb, errCb, comCb)
}
// 新建联系人
function addCustomer(data, susCb, errCb, comCb ) {
    xhr(null, API.addCustomer(), data, susCb, errCb, comCb)
}
// 修改联系人
function editClues(data, susCb, errCb, comCb ) {
    xhr('post', API.editClues(), data, susCb, errCb, comCb)
}

module.exports = {
    loginOut: loginOut,
    loginIn: loginIn,
    getPhoneMsg: getPhoneMsg,
    getPhoneLog: getPhoneLog,
    addBrand: addBrand,
    addClues: addClues,
    addClueFollowUp: addClueFollowUp,
    addCustomer: addCustomer,
    editClues: editClues,
    getCluesList: getCluesList,
    getRobList: getRobList,
    getCustomerList: getCustomerList,
    upDateClueTime: upDateClueTime,
    robCustomer: robCustomer,
    reedBack: reedBack,
    changePwd: changePwd,
    addUser: addUser,
    getAllUrl: getAllUrl,
    allCluesList: allCluesList,
    changeClueStatus: changeClueStatus,
    getCluesDetail: getCluesDetail,
    getClueUpList: getClueUpList
}


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
    })
}