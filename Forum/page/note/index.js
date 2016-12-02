const XHR = require('../../requests/request.js')
var APP = getApp()
Page({
    data:{
        nowPage: 1,
        noteList: {}
    },
    onLoad:function(options) {
        this.upData(options.id)
    },
    upData:function(id) {
        let newPage = this.data.nowPage
        XHR.getDetail({tid:id, page: newPage},
            (db) => {
                if(db.status === 0) {
                    this.setData({
                        noteList: db.data
                    })
                }
            }
        )
    },
    onReady:function(){
        if(this.data.noteList.thread.subject){
            wx.setNavigationBarTitle({
              title: this.data.noteList.thread.subject
            })
        }
    },
    onShow:function(){
        

    },
    onHide:function(){
    // 页面隐藏

    },
    onUnload:function(){
    // 页面关闭

    }
})
