const XHR = require('../../requests/request.js')
var APP = getApp()
Page({
    data:{
        img: 'http://face.360che.com/data/avatar/noavatar_big.gif-120x120.jpg',
        loading: true,
        scrollTop: '',
        showFA: false,
        isLoding: true,


        nowPage: 1,
        tid: '',
        thread: {},
        postlist: [],
        comments: [],
        hots: []
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
                        let da = `${db.data.thread.pid}`
                        this.setData({
                            thread: db.data.thread,
                            postlist: db.data.postlist,
                            hots: db.data.hots,
                            comments: db.data.comments[da],
                            isLoding: db.data.postlist >= 20 ? true : false
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
        let txt = this.data.thread.subject
        if(txt){
            wx.setNavigationBarTitle({
              title: txt
            })
        }
    },
    rcmdAdd:function(e) {
        let tid = e.target.dataset.tid
        let pid = e.target.dataset.pid
        let idx = e.target.dataset.idx
        let dis = e.target.dataset.dis
        let newL = this.data.postlist
        // console.log( dis, idx, tid,'sssssssssss')
        if(dis !== 'true') {
            XHR.getLaud({tid: tid,pid: pid},
                (db) => {
                    if(db.status === 0) {
                        if(db.data.recommend_count) {
                           newL[idx]['recommend_add'] = db.data.recommend_count 
                        }
                        newL[idx]['rcmd'] = true
                        this.setData({
                            postlist: newL
                        })
                    } else {
                        // icon: 'info',
                        wx.showToast({
                          title: db.data,
                          
                          duration: 2000
                        })
                    }
                }
            )
        }
    },
    miAdd:function(e){
        let tid = e.target.dataset.tid
        let dis = e.target.dataset.dis
        let newL = this.data.thread
        // console.log( dis, idx, tid,'sssssssssss')
        if(dis !== 'true') {
            XHR.getLaud({tid: tid},
                (db) => {
                    if(db.status === 0) {
                        if(db.data.recommend_count) {
                           newL['recommend_add'] = db.data.recommend_count 
                        }
                        newL['rcmd'] = true
                        this.setData({
                            thread: newL
                        })
                    } else {
                        // icon: 'info',
                        wx.showToast({
                          title: db.data,
                          
                          duration: 2000
                        })
                    }
                }
            )
        }
    },
    goUser:function(e) {
        wx.navigateTo({
            url: `../friends/index?id=${e.target.dataset.tid}`
        })
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
    goHome:function(){
        let nub = getCurrentPages().length - 1
        wx.navigateBack({delta: nub})
    },
    onShow:function(){},
    onHide:function(){},
    onUnload:function(){}
})
