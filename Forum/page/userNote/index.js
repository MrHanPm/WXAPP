const XHR = require('../../requests/request.js')
let addId // 临时储存点击id
Page({
    data: {
        loading: true,     // 延时加载数据
        scrollTop: '',
        showFA: false,     // 火箭图标
        isLoding: true,    // 是否加载
        activeIndex: 0,
        

        nowPage: 1,
        eNowPage: 1,
        newList:[],
        eliteList:[],
        loads: true,
    },
    onLoad:function(options) {
        this.setData({activeIndex: options.id})
        this.upData()
        this.upElite()
    },
    onReady:function(){
        if (this.data.activeIndex == '0') {
            wx.setNavigationBarTitle({title: '十大热贴'})
        } else {
            wx.setNavigationBarTitle({title: '精华'})
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
                        this.setData({
                            newList: newLists,
                            nowPage: newPage,
                            loading: true
                        })
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
            XHR.getElite({page: newPage},
                (db) => {
                    if(db.status === 0) {
                        newPage++
                        newLists.push(...db.data)
                        this.setData({
                            eliteList: newLists,
                            eNowPage: newPage,
                            loads: true
                        })
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
        if(dis !== 'true' && oldId !== addId) {
            XHR.getLaud({tid: tid},
                (db) => {
                    if(db.status === 0) {
                        if(db.data.recommend_count) {
                           newL[idx]['recommend_add'] = db.data.recommend_count 
                        }
                        newL[idx]['rcmd'] = true
                        if( nowIndex == '0'){
                            this.setData({
                                newList: newL
                            })
                        }else{
                            this.setData({
                                eliteList: newL
                            })
                        }
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
    }
});
