const XHR = require('../../requests/request.js')
var APP = getApp()
Page({
    data:{
        autoplay: true,
        interval: 3000,
        duration: 1000,

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
        XHR.getNewList({page: newPage},
            (db) => {
                if(db.status === 0) {
                    this.setData({
                        hotNews: db.data.hotnews,
                        newList: db.data.threadlist
                    })
                }
            }
        )
    },
    onReady:function(){
    // 页面渲染完成
    },
    onHide:function(){
    // 页面隐藏
    },
    onUnload:function(){
    // 页面关闭
    },
    rcmdAdd:function(e) {
        let tid = e.target.dataset.tid
        let idx = e.target.dataset.idx
        let dis = e.target.dataset.dis
        let newL = this.data.newList
        console.log( dis, idx, tid,'sssssssssss')
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
                    }
                }
            )
        }
    }
})
