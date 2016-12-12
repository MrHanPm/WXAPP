const XHR = require('../../requests/request.js')
// var APPS = getApp()
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
    },
    upData:function(){
        let newPage = this.data.nowPage
        let newNews = this.data.dataList
        if (this.data.loading) {
            this.setData({loading: false})
            XHR.getFriendsForum({page: newPage},
                (db) => {
                    if(db.status === 0) {
                        if(db.data.length < 20){
                            newNews.push(...db.data)
                            this.setData({
                                dataList: newNews,
                                loading: false,
                                isLoding: false
                            })
                        }else{
                            newPage++
                            newNews.push(...db.data)
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
    }
})
