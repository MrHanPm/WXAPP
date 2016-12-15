const XHR = require('../../requests/request.js')
const UT = require( '../../util/util.js' )
var APPS = getApp()
Page({
    data:{
        showTopTips: false, // 是否显示提醒
        showTopTxt: ' ', // 显示提醒文字

        getBtnPM: false,  // 获取按钮是否禁用


        binBtnPM: true,  // 获取按钮是否禁用
        binLoding: false,  // 获取按钮是否禁用


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
        })
        if(this.data.tel !== '' && this.data.vercode !== ''){
            this.setData({
                binBtnPM: false,
                getBtnPM: false
            })
        }
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
    checkCoMsg () {
        console.log(this.data.vercode.length,44444)
        if(this.data.vercode.length !== 4){
            this.ALT('验证码长度必须4位');
            return false;
        }
        return true;
    },
    callPhoneMsg (){
        if(this.checkForm()){
            let json = {}
            json.action='sms'
            json.sendtype = 0
            json.type='empty'
            json.session_id = APPS.SESSIONID
            json.method='singlecall'
            json.mobile=this.data.tel
            XHR.postWrite('post',json,
                (db) => {
                    if(db.status === 0){
                        this.setData({
                            getBtnPM: true
                        })
                    }else{
                        this.ALT(db.data)
                    }
                }
            )
        }
    },
    getPhoneMsg: function (){
        if(this.checkForm()){
            let json = {}
            json.action='sms'
            json.sendtype = 0
            json.type='empty'
            json.session_id = APPS.SESSIONID
            json.method='sendCaptcha'
            json.mobile=this.data.tel
            json.apptype = 'wxapp'
            XHR.postWrite('post',json,
                (db) => {
                    if(db.status === 0){
                        this.setData({
                            getBtnPM: true
                        })
                    }else{
                        this.ALT(db.data)
                    }
                }
            )
        }
    },
    bindPhone () {
        if(this.checkForm() && this.checkCoMsg()){
            this.setData({binBtnPM: true})
            let json = {}
            json.action='member'
            // json.sendtype = 0
            // json.type='empty'
            json.session_id = APPS.SESSIONID
            json.method='mobileLogin'
            json.mobile=this.data.tel
            json.captcha=this.data.vercode
            XHR.postWrite('post',json,
                (db) => {
                    if(db.status === 0){
                        wx.redirectTo({
                            url: '../index'
                        })
                    }else{
                        this.ALT(db.data)
                    }
                }
            )
        }
    }
})
