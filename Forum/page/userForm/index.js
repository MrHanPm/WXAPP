const XHR = require('../../requests/request.js')
var APPS = getApp()
Page({
    data:{
        loading: true,  // 延时加载数据

        myFol: []     // 关注的车型
    },
    onLoad:function() {
        
        this.getCarList()
        XHR.GA({
          v:1,
          tid:'UA-77901546-9',
          cid:APPS.SESSIONID,
          t:'pageview',
          dh:'bbs.360che.com',
          dp:'/userForm/index',        // 页面路径
          dt:'\u6211\u5173\u6ce8\u7684\u8f66\u578b\u9875',    // 页面标题
          cd1: APPS.SESSIONID // 用户识别码
        })
    },
    getCarList:function(){
        XHR.getCarTypeList('',
            (db) => {
                if(db.status === 0){
                    this.setData({
                        myFol: db.data,
                        loading: false
                    })
                }
                
            }
        )
    },
    delFavorties:function(e){
        let dix = e.target.dataset.dix
        let clubList = this.data.myFol
        XHR.addFavorties({operation:'delfavorites',id:e.target.dataset.id},
            (db) => {
                if(db.status === 0){
                    clubList.splice(dix,1)
                    this.setData({myFol: clubList})
                }else{
                    wx.showModal({
                        title: '提示',
                        content: db.data,
                        showCancel: false,
                        success: function(res) {
                            // if (res.confirm) {
                            //   console.log('用户点击确定')
                            // }
                        }
                    })
                }
            }
        )
    },
    toBack:function() {
        wx.navigateBack({delta:1})
    },
})
