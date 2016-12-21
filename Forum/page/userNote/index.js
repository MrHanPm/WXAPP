const XHR = require('../../requests/request.js')
var APPS = getApp()
let addId // 临时储存点击id
Page({
    data: {
        
        scrollTop: '',
        showFA: false,     // 火箭图标
        isLoding: true,    // 是否加载
        loading: true,     // 延时加载数据

        isLoding_M: true, // 回帖是否加载
        loads: true, // 回帖 延时加载数据
        activeIndex: 0,
        

        nowPage: 1,
        eNowPage: 1,
        newList:[],
        eliteList:[],
        
    },
    onLoad:function(options) {
        this.setData({activeIndex: options.id})
        this.upData()
        this.upElite()
        XHR.GA({
          v:1,
          tid:'UA-77901546-9',
          cid:APPS.SESSIONID,
          t:'pageview',
          dh:'bbs.360che.com',
          dp:'/userNote/index',        // 页面路径
          dt:'\u6211\u7684\u5e16\u5b50\u5217\u8868',    // 页面标题
          cd1: APPS.SESSIONID // 用户识别码
        })
    },
    onReady:function(){
        // if (this.data.activeIndex == '0') {
        //     wx.setNavigationBarTitle({title: '我的主贴'})
        // } else {
        //     wx.setNavigationBarTitle({title: '我的回帖'})
        // }
    },
    upData:function() {
        let newPage = this.data.nowPage
        let newLists = this.data.newList
        if (this.data.loading) {
            this.setData({loading: false})
            XHR.getToForum({method:'posts', page: newPage},
                (db) => {
                    if(db.status === 0) {
                        newPage++
                        newLists.push(...db.data)
                        if(db.data.length < 10){
                            this.setData({
                                newList: newLists,
                                isLoding: false
                            })
                        }else{
                            this.setData({
                                newList: newLists,
                                nowPage: newPage,
                                loading: true
                            })
                        }
                    }
                }
            )
        }
    },
    upElite:function() {
        let newPage = this.data.eNowPage
        let newLists = this.data.eliteList
        if (this.data.loads) {
            this.setData({loads: false})
            XHR.getToForum({method:'replies', page: newPage},
                (db) => {
                    if(db.status === 0) {
                        newPage++
                        newLists.push(...db.data)
                        if(db.data.length < 10){
                            this.setData({
                                eliteList: newLists,
                                isLoding_M: false
                            })
                        }else{
                            this.setData({
                                eliteList: newLists,
                                eNowPage: newPage,
                                loads: true
                            })
                        }
                    }
                }
            )
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
    loadMore:function() {
        this.upData()
    },
    ldMore:function() {
        this.upElite()
    },
    activeTab:function (e) {
        let id = e.target.dataset.id
        // if (id == '0') {
        //     wx.setNavigationBarTitle({title: '我的主贴'})
        // } else {
        //     wx.setNavigationBarTitle({title: '我的回帖'})
        // }
        this.setData({activeIndex: id})
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
    }
});
