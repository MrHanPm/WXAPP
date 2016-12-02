const imSrc = '../../../resources/image/vcode.jpg';
const URL = require('../../../config.js');
const XHR = require('../../../requests/request.js');
const UT = require( '../../../util/util.js' );


Page({
    data: {
        showTopTips: false,
        showTopTxt: ' ',

        btnTxt: '获取验证码',
        countdown: 60,
        dsbMsg: false,
        subMsg: false,
        subLod: false,

        codeSrc: '',
        iscode: false,
        
        tel: '',
        captcha: '',
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
    onLoad: function () {
        this.getVcode();
    },
    getVcode: function () {
        this.setData({
            codeSrc: imSrc
        });
        let numb = Math.random();
        setTimeout(() => {
            let srcs = URL + 'Comm/Captcha.aspx?&'+ numb ;
            this.setData({
                iscode: false,
                codeSrc: srcs
            });
        },300);
    },
    callPhone: function (e) {
        wx.makePhoneCall({
          phoneNumber: '4006136188'
        });
    },
    bindKeyInput: function (e) {
        this.setData({
            [e.target.id]: e.detail.value
        });
    },
    goPage: function () {
        wx.redirectTo({
          url: 'logins'
        });
    },
    setTime: function() {
        if (this.data.countdown === 0) { 
            this.setData({
                btnTxt: '获取验证码',
                countdown: 60,
                dsbMsg: false
            });
        } else {
            let txt = "重发验证(" + this.data.countdown + "s)" ;
            let s = this.data.countdown ;
            s-- ;
            this.setData({
                btnTxt: txt,
                countdown: s,
                dsbMsg: true
            });
            setTimeout(() => this.setTime(), 1000);
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
        if(!UT.isNo(this.data.captcha)){
            this.ALT('请输入图形码');
            return false;
        }
        return true;
    },
    checkF: function () {
        if(!UT.isNo(this.data.vercode)){
            this.ALT('请输入验证码');
            return false;
        }
        return true;
    },
    getMsg: function () {
        if(this.checkForm()) {
            this.setTime();
            let json = {};
            json.tel = this.data.tel;
            json.captcha = this.data.captcha;
            XHR.getPhoneMsg(json,
                (db) => {
                    if(db.status === 1){
                        
                    }else{
                        this.setData({
                            iscode: true,
                            btnTxt: '获取验证码',
                            countdown: 0,
                            dsbMsg: false
                        });
                        this.ALT(db.msg);
                    }
                }
            )
        }
    },
    goSub: function () {
        if(this.checkForm() && this.checkF()) {
            let Apps = getApp();
            console.log(Apps.globalData,'globalData');
            this.setData({subMsg: true, subLod: true})
            let json = {};
            json.logintype = 3;
            json.tel = this.data.tel;
            json.vercode = this.data.vercode;
            json.wxcode = Apps.globalData.wxCode;
            XHR.getPhoneLog(json,
                (db) => {
                    console.log(db, 'db');
                }
            )
        }
    }
});
