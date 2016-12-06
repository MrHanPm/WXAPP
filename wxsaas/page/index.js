const URL = require('../config.js')
Page({
    data: {
        winHeight:'',
        showTopTips: false,
        errMsg:''
    },
    showTopTip: function(txt){
        var that = this;
        if (txt) {
            this.setData({
                showTopTips: true,
                errMsg: txt
            });
        }else{
            this.setData({
                showTopTips: true
            }); 
        }
        setTimeout(function(){
            that.setData({
                showTopTips: false
            });
        }, 3000);
    },
    onShow: function () {
        let self = this;
        wx.getSystemInfo({
          success:(res) => {
            // console.log(res.model) // 手机型号
            // console.log(res.pixelRatio)// 设备像素比
            // console.log(res.windowWidth)
            // console.log(res.windowHeight)
            // console.log(res.language)
            // console.log(res.version) // 微信版本号
            let wh = res.windowHeight + 'px';
            self.setData({
                winHeight: wh
            });
          }
        });

        setTimeout(function(){
            wx.redirectTo({
              url: 'form/login/login'
            })
        }, 1000);

        wx.login({
          success: (res) => {
            // this.showTopTip('获取用户登录态失败！')
            console.log(res,URL)
            if (res.code) {
              //发起网络请求
              // wx.request({
              //   url: 'https://test.com/onLogin',
              //   data: {
              //     code: res.code
              //   }
              // })
            } else {
              this.showTopTip(res.errMsg)
            }
          }
        });
    }
});
