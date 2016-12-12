const XHR = require('../../requests/request.js')
const UT = require( '../../util/util.js' )
var APPS = getApp()
Page({
    data:{
        showTopTips: false, // 是否显示提醒
        showTopTxt: ' ', // 显示提醒文字

        USERINFO: {},

        tel: '',
        vercode: ''
    },
    ALT: function (txt) {
        var that = this;
        this.setData({
            showTopTips: true,
            showTopTxt: txt
        });
        setTimeout(function(){
            that.setData({
                showTopTips: false
            });
        }, 3000);
    },
    onLoad:function() {
        this.setData({
            USERINFO: APPS.USERINFO.userInfo
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
        return true;
    },
    getPhoneMsg: function (){
        if(this.checkForm()){
            let json = {}
            json.action='sms'
            json.sendtype = 0
            json.session_id = APPS.SESSIONID
            json.method='sendCaptcha'
            json.mobile=this.data.tel
            XHR.postWrite('post',json,
                () => {

                }
            )
        }
    }
})
