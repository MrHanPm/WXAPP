const XHR = require('../../../requests/request.js');
const UT = require( '../../../util/util.js' );

Page({
    data: {
        showTopTips: false,
        showTopTxt: ' ',
        subMsg: false,
        subLod: false,

        tel: '',
        pwd: ''
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
    bindKeyInput: function (e) {
        this.setData({
            [e.target.id]: e.detail.value
        });
    },
    callPhone: function (e) {
        wx.makePhoneCall({
          phoneNumber: '4006136188'
        });
    },
    goPage: function () {
        wx.redirectTo({
          url: 'login'
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
        if(!UT.isNo(this.data.pwd)){
            this.ALT('请输入密码');
            return false;
        }
        if(this.data.pwd.length < 6){
            this.ALT('密码不能少于6位');
            return false;
        }
        return true;
    },
    goNext: function () {
        if(this.checkForm()) {
            let json = {};
            json.tel = this.data.tel;
            json.pwd = this.data.pwd;
            json.apptype = 'weixin';
            XHR.bindTelPwd(json,
                (db) => {
                    if(db.status === 1){
                        wx.redirectTo({
                          url: '../../user/xs/index'
                        });
                    }else{
                        wx.redirectTo({
                          url: '../../user/xs/index'
                        });
                        this.ALT(db.msg);
                    }
                }
            )
        }
    }
});
