const URL = require('../config.js')

// 退出
function loginOut() { return URL + 'User/LoginOut.aspx' }
/**---------------BIND-------------------**/
// 获取验证码
function getPhoneMsg() { return URL + 'User/SendSMSYanMa.aspx' }
// 验证码登录
function getPhoneLog() { return URL + 'WeiXin/BindTel.aspx' }
// 销售的品牌
function addBrand() { return URL + 'WeiXin/GetWXDealerUserAddBrand.aspx' }
// 账号登录
function loginIn() { return URL + 'User/Login.aspx'}
// 创建用户
function addUser() { return URL + 'User/AddUser.aspx'}
/**---------------USER-------------------**/
// 添加收藏
function changeStatus() { return URL + 'Customer/ChangeCustomerStatus.aspx'}
// 获取联系人列表
function getCluesList() { return URL + 'Clues/GetCluesList.aspx' }
// 获取最新线索列表
function getRobList() { return URL + 'Clues/GetRobCluesList.aspx' }
// 抢线索
function robCustomer() { return URL + 'PublicClues/RobCustomer.aspx' }
// 更新联系人时间
function upDateClueTime() { return URL + 'Customer/UpdateCustomerLastLinkTime.aspx' }
/**-------------PUBLIC--------------*/
// 初始化加载
function getAllUrl() { return URL + 'Comm/GetAllCategoryDownUrl.aspx'}
// 收藏/最近联系人
function getCustomerList() { return URL + 'Customer/GetCustomerList.aspx' }
// 公共线索池
function allCluesList() { return URL + 'PublicClues/GetCluesList.aspx'}
// 线索详情里面的
function changeClueStatus() { return URL + 'Clues/ChangeCluesStatus.aspx'}
// 线索详情
function getCluesDetail() { return URL + 'Clues/GetCluesDetail.aspx'}
// 跟进记录列表
function getClueUpList() { return URL + 'Clues/GetClueFollowUpList.aspx'} 
/**---------------BOSS-------------------**/
/**----------------------------FORM-----------------------**/
// 修改密码
function changePwd() { return URL + 'User/ChangePwd.aspx'}
// 提意见
function reedBack() { return URL + 'User/Feedback.aspx'}
// 添加线索
function addClues() { return URL + 'Clues/AddClues.aspx' }
// 添加跟进纪录
function addClueFollowUp() { return URL + 'Clues/AddClueFollowUp.aspx' }
// 新建联系人
function addCustomer() { return URL + 'Customer/AddCustomer.aspx' }
// 修改联系人
function editClues() { return URL + 'Clues/EditClues.aspx' }



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
