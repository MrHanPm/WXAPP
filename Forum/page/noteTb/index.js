const XHR = require('../../requests/request.js')
var APPS = getApp()
let addId // 临时储存点击id
Page({
    data: {
        loading: true,     // 延时加载数据
        elloading: true,     // 延时加载数据精华
        scrollTop: '',
        showFA: false,     // 火箭图标
        isLoding: true,    // 是否加载
        elisLoding: true,  // 是否加载精华
        activeIndex: 0,
        ShareBox: true,  // 分享引导

        nowPage: 1,
        eNowPage: 1,
        newList:[],
        eliteList:[]
    },
    onLoad:function(options) {
        this.setData({activeIndex: options.id})
        this.upData()
        this.upElite()
    },
    onReady:function(){
        if (this.data.activeIndex == '0') {
            wx.setNavigationBarTitle({title: '十大热贴'})
            XHR.GA({
              v:1,
              tid:'UA-77901546-9',
              cid:APPS.SESSIONID,
              t:'pageview',
              dh:'bbs.360che.com',
              id: this.data.activeIndex,
              dp:'/noteTb/index',
              dt:'\u5341\u5927\u70ed\u8d34',
              cd1: APPS.SESSIONID 
            })
        } else {
            wx.setNavigationBarTitle({title: '精华'})
            XHR.GA({
              v:1,
              tid:'UA-77901546-9',
              cid:APPS.SESSIONID,
              t:'pageview',
              dh:'bbs.360che.com',
              id: this.data.activeIndex,
              dp:'/noteTb/index',
              dt:'\u7cbe\u534e',
              cd1: APPS.SESSIONID 
            })
        }
    },
    upData:function() {
        let newPage = this.data.nowPage
        let newLists = this.data.newList
        if (this.data.loading) {
            this.setData({loading: false})
            XHR.getHotTen({page: newPage},
                (db) => {
                    if(db.status === 0) {
                        newPage++
                        newLists.push(...db.data)
                        // if(db.data.length < 10) {
                        //     this.setData({
                        //         newList: newLists,
                        //         isLoding: false
                        //     })
                        // }else{
                            this.setData({
                                newList: newLists,
                                nowPage: newPage,
                                loading: true
                            })
                        // }
                        if(this.data.nowPage >= 2){
                            XHR.GA({
                                v:1,
                                tid:'UA-77901546-9',
                                cid:APPS.SESSIONID,
                                t:'event',
                                dp:'/noteTb/index',
                                ec:'\u8bba\u575b',
                                ea:'\u5341\u5927\u70ed\u8d34\u52a0\u8f7d\u4e0b\u4e00\u9875',
                                el:'',
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
        if (this.data.elloading) {
            this.setData({elloading: false})
            XHR.getElite({page: newPage},
                (db) => {
                    if(db.status === 0) {
                        newPage++
                        newLists.push(...db.data)
                        if(db.data.length < 20) {
                            this.setData({
                                eliteList: newLists,
                                elisLoding: false
                            })
                        }else{
                            this.setData({
                                eliteList: newLists,
                                eNowPage: newPage,
                                elloading: true
                            })
                            if(this.data.eNowPage >= 2){
                                XHR.GA({
                                    v:1,
                                    tid:'UA-77901546-9',
                                    cid:APPS.SESSIONID,
                                    t:'event',
                                    dp:'/noteTb/index',
                                    ec:'\u8bba\u575b',
                                    ea:'\u7cbe\u534e\u52a0\u8f7d\u4e0b\u4e00\u9875',
                                    el:'',
                                })
                            }
                        }
                    }
                }
            )
        }
    },
    rcmdAdd:function(e) {
        let tid = e.target.dataset.tid
        let oldId = addId
        addId = tid
        let idx = e.target.dataset.idx
        let dis = e.target.dataset.dis
        let nowIndex = this.data.activeIndex
        let newL
        if( nowIndex == '0'){
            newL = this.data.newList
        }else{
            newL = this.data.eliteList
        }
        // console.log( dis, idx, tid,'sssssssssss')
        if(dis < 0 && oldId !== addId) {
            XHR.getLaud({tid: tid},
                (db) => {
                    if(db.status === 0) {
                        if(db.data.recommend_count) {
                           newL[idx]['recommend_add'] = db.data.recommend_count 
                        }
                        newL[idx]['liked'] = 2
                        if( nowIndex == '0'){
                            this.setData({
                                newList: newL
                            })
                        }else{
                            this.setData({
                                eliteList: newL
                            })
                        }
                        XHR.GA({
                            v:1,
                            tid:'UA-77901546-9',
                            cid:APPS.SESSIONID,
                            t:'event',
                            dp:'/noteTb/index',
                            ec:'\u8bba\u575b',
                            ea:'\u70b9\u8d5e\u5e16\u5b50',
                            el:''
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
    goUser:function(e) {
        wx.navigateTo({
            url: `../friends/index?id=${e.target.dataset.tid}`
        })
    },
    goMsg:function(e) {
        wx.navigateTo({
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
        if (id == '0') {
            wx.setNavigationBarTitle({title: '十大热贴'})
        } else {
            wx.setNavigationBarTitle({title: '精华'})
        }
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
    },
    ShareBox(){
        if(this.data.ShareBox){
            this.setData({
                ShareBox: false
            })
        }else{
            this.setData({
                ShareBox: true
            })
        }
        
    }
});
