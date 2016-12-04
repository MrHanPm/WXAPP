const XHR = require('../../requests/request.js')
var APP = getApp()
Page({
    data:{
        img: 'http://face.360che.com/data/avatar/noavatar_big.gif-120x120.jpg',
        loading: true,
        scrollTop: '',
        showFA: false,


        nowPage: 1,
        tid: '',
        thread: {},
        postlist: []
    },
    onLoad:function(options) {
        // this.setData({tid: options.id})
        this.upData(options.id)
    },
    upData:function(tid) {
        let tids
        if(tid) {
            tids = tid
        } else {
            tids = this.data.tid
        }
        let newPage = this.data.nowPage
        if (this.data.loading) {
            this.setData({loading: false})
            XHR.getDetail({tid: tid, page: newPage},
                (db) => {
                    if(db.status === 0) {
                        newPage++
                        this.setData({
                            thread: db.data.thread,
                            postlist: db.data.postlist
                        })
                    }
                }
            )
        }
    },
    loadMore:function() {
        this.upData()
    },
    onReady:function(){
        // if(this.data.noteList.thread.subject){
        //     wx.setNavigationBarTitle({
        //       title: this.data.noteList.thread.subject
        //     })
        // }
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
    toBack:function() {
        wx.navigateBack({delta:1})
    },
    onShow:function(){},
    onHide:function(){},
    onUnload:function(){}
})
