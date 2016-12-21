const URL = require('../config.js')
// const UT = require( '../util/util.js' )
const XHR = require('../requests/request.js')
var APPS = getApp()
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
            })
        }else{
            this.setData({
                showTopTips: true
            }) 
        }
        setTimeout(function(){
            that.setData({
                showTopTips: false
            })
        }, 3000)
    },
    onShow: function () {
        let self = this;
        wx.getSystemInfo({
          success:(res) => {
            APPS.SystemInfo = res
            // console.log(res.model) // 手机型号
            // console.log(res.pixelRatio)// 设备像素比
            // console.log(res.windowWidth)
            // console.log(res.windowHeight)
            // console.log(res.language)
            // console.log(res.version) // 微信版本号
            let wh = res.windowHeight + 'px'
            self.setData({
                winHeight: wh
            })
          }
        })

        wx.login({
          success: (res) => {
            APPS.WXCODE = res.code

            wx.getUserInfo({
                success: (resData) => {
                  // console.log(resData)
                  // console.log(resData.encryptData)
                  // console.log(resData.encryptedData)
                  // console.log(resData.iv)
                  // console.log(resData.signature)
                  APPS.USERINFO = resData
                }
            })

            XHR.getHotTen({wxcode: res.code},
              (db) => {
                if(db.status === 0){
                  APPS.SESSIONID = db.data
                  wx.redirectTo({
                    url: 'home/index'
                  });
                }else{
                  this.showTopTip(db.data)
                }
              },
              () => {
                this.showTopTip('网络错误！稍后重试～')
              }
            )
            XHR.GA({
              v:1,
              tid:'UA-77901546-9',
              cid:res.code,
              t:'pageview',
              dh:'bbs.360che.com',
              dp:'/index',        // 页面路径
              dt:'初始化加载',    // 页面标题
              cd1:'null'   // 用户识别码
            })
          }
        })
    }
})
