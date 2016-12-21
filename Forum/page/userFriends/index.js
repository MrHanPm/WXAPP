const XHR = require('../../requests/request.js')
var APPS = getApp()
Page({
    data:{
        loading: true,  // 延时加载数据
        isLoding: true, // 是否加载
        scrollTop: '',
        showFA: false,   // 火箭图标

        nowPage: 1,
        dataList:[]
    },
    onLoad:function(){
        this.upData()
        XHR.GA({
          v:1,
          tid:'UA-77901546-9',
          cid:APPS.SESSIONID,
          t:'pageview',
          dh:'bbs.360che.com',
          dp:'/userFriends/index',        // 页面路径
          dt:'\u6211\u5173\u6ce8\u597d\u53cb\u7684\u5e16\u5b50\u5217\u8868',    // 页面标题
          cd1: APPS.SESSIONID // 用户识别码
        })
    },
    upData:function(){
        let newPage = this.data.nowPage
        let newNews = this.data.dataList
        if (this.data.loading) {
            this.setData({loading: false})
            XHR.getFriendsForum({page: newPage},
                (db) => {
                    if(db.status === 0) {
                        newPage++
                        newNews.push(...db.data)
                        if(db.data.length < 10){
                            this.setData({
                                dataList: newNews,
                                isLoding: false
                            })
                        }else{
                            this.setData({
                                dataList: newNews,
                                nowPage: newPage,
                                loading: true
                            })
                        }
                    }
                }
            )
        }
    },
    loadMore:function() {
        this.upData()
    },
    goTop:function() {
        this.setData({scrollTop: 'HD'})
    },
    onSol:function(e) {
        if (e.detail.scrollTop > 560){
            this.setData({
                showFA: true,
                scrollTop:''
            })
        } else {
            this.setData({
                showFA: false
            })
        }
    },
    goUser:function(e) {
        wx.redirectTo({
            url: `../friends/index?id=${e.target.dataset.tid}`
        })
    },
    goMsg:function(e) {
        wx.redirectTo({
            url: `../note/index?id=${e.target.dataset.tid}`
        })
    },
    toBack:function() {
        wx.navigateBack({delta:1})
    },
})
