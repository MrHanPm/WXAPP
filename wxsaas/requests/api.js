const URL = require('../config.js');


/**---------------BIND-------------------**/
//获取验证码
function getPhoneMsg() {
    return URL + 'User/SendSMSYanMa.aspx';
}
//验证码登录
function getPhoneLog() {
    return URL + 'WeiXin/BindTel.aspx';
}


/**---------------USER-------------------**/



/**---------------BOSS-------------------**/


/**---------------FORM-------------------**/

function getStoryLongComments( storyId ) {
    return URL + '/' + storyId + '/long-comments';
}



module.exports = {
    getPhoneMsg: getPhoneMsg,
    getPhoneLog: getPhoneLog
};
