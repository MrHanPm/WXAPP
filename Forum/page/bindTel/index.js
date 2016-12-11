const XHR = require('../../requests/request.js')
const UT = require( '../../util/util.js' )
var APPS = getApp()
Page({
    data:{
        USERINFO: {},

        tel: '',
        vercode: ''
    },
    onLoad:function() {
        let usd = APPS.USERINFO.userInfo
        console.log(usd,4444444)
        this.setData({
            USERINFO: usd
        })
    },
    bindKeyInput: function (e) {
        this.setData({
            [e.target.id]: e.detail.value
        });
    },
    checkForm: function () {
        if(!UT.isNo(this.data.tel)){
            this.ALT('请输入手机号');
            return false;
        }
        if(!UT.checkPhone(this.data.tel)){
            this.ALT('手机号不正确');
            return false;
        }
        if(!UT.isNo(this.data.captcha)){
            this.ALT('请输入图形码');
            return false;
        }
        return true;
    },
})
