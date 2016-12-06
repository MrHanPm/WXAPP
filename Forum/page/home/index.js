const XHR = require('../../requests/request.js')
var APP = getApp()
Page({
    data:{
        autoplay: true,
        interval: 3000,
        duration: 1000,

        loading: true,
        scrollTop: '',
        showFA: false,

        nowPage: 1,
        hotNews: [],
        newList: [],
        myFol: []
    },
    onLoad:function() {
        this.upData()
    },
    upData:function() {
        let newPage = this.data.nowPage
        let newNews = this.data.hotNews
        let newLists = this.data.newList
        if (this.data.loading) {
            this.setData({loading: false})
            XHR.getNewList({page: newPage},
                (db) => {
                    if(db.status === 0) {
                        newPage++
                        newNews.push(...db.data.hotnews)
                        newLists.push(...db.data.threadlist)
                        this.setData({
                            hotNews: newNews,
                            newList: newLists,
                            nowPage: newPage,
                            loading: true
                        })
                    }
                }
            )
        }
        
    },
    loadMore:function() {
        this.upData()
    },
    rcmdAdd:function(e) {
        let tid = e.target.dataset.tid
        let idx = e.target.dataset.idx
        let dis = e.target.dataset.dis
        let newL = this.data.newList
        // console.log( dis, idx, tid,'sssssssssss')
        if(dis !== 'true') {
            XHR.getLaud({tid: tid},
                (db) => {
                    if(db.status === 0) {
                        if(db.data.recommend_count) {
                           newL[idx]['recommend_add'] = db.data.recommend_count 
                        }
                        newL[idx]['rcmd'] = true
                        this.setData({
                            newList: newL
                        })
                    }else{
                        wx.showToast({
                          title: db.data,
                          duration: 2000
                        })
                    }
                }
            )
        }
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
        wx.navigateTo({
            url: `../note/index?id=${e.target.dataset.tid}`
        })
    },
    goMsg:function(e) {
        wx.navigateTo({
            url: `../note/index?id=${e.target.dataset.tid}`
        })
    }
})

    
    // onReady:function(){
    // // 页面渲染完成
    // },
    // onHide:function(){
    // // 页面隐藏
    // },
    // onUnload:function(){
    // // 页面关闭
    // },
