const XHR = require('../../requests/request.js')
let addId // 临时储存点击id
Page({
    data: {
        loading: true,     // 延时加载数据
        scrollTop: '',
        showFA: false,     // 火箭图标
        isLoding: true,    // 是否加载

        isLoding_M: true, // 回帖
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
                        if(db.data.length < 20){
                            newLists.push(...db.data)
                            this.setData({
                                newList: newLists,
                                nowPage: newPage,
                                loading: false,
                                isLoding: false
                            })
                        }else{
                            newPage++
                            newLists.push(...db.data)
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
                        if(db.data.length < 20){
                            newLists.push(...db.data)
                            this.setData({
                                eliteList: newLists,
                                eNowPage: newPage,
                                loads: false,
                                isLoding_M: false
                            })
                        }else{
                            newPage++
                            newLists.push(...db.data)
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
