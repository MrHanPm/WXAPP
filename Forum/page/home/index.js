const XHR = require('../../requests/request.js')
var APPS = getApp()

let addId // 临时储存点击id
Page({
    data:{
        autoplay: true,
        interval: 3000,
        duration: 1000,

        loading: true,  // 延时加载数据
        isLoding: true, // 是否加载
        scrollTop: '',
        showFA: false,   // 火箭图标

        nowPage: 1,
        HASLOGIN: false, // 用户是否登录
        userInfo:{},   // 获取的用户信息
        isUserInfo: false, // 判断获取用户的信息是否完整
        signDay: 0,       // 签到几天
        hotNews: [],     // 公告
        newList: [],
        myFol: []     // 关注的车型
    },
    onLoad:function() {
        this.upData()
        this.GETUSERINFO()
        this.getCarList()
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
    GETUSERINFO:function(){
        let json = {}
        json.action = 'member'
        json.method = 'wechatLogin'
        json.encryptData = APPS.USERINFO.encryptedData
        json.iv = APPS.USERINFO.iv
        json.session_id = APPS.SESSIONID
        XHR.postWrite('get',json,
            (db) => {
                if(db.status === 0){
                    APPS.HASLOGIN = true
                    wx.setStorageSync('_USERINFO',db.data) // 储存线上数据
                    this.setData({
                        userInfo: db.data,
                        isUserInfo: true,
                        HASLOGIN: true
                    })
                }else{
                    this.setData({
                        userInfo: APPS.USERINFO.userInfo
                    })
                }
            }
        )
    },
    getCarList:function(){
        XHR.getCarTypeList('',
            (db) => {
                this.setData({
                    myFol: db.data
                })
            }
        )
    },
    loadMore:function() {
        this.upData()
    },
    rcmdAdd:function(e) {
        let tid = e.target.dataset.tid
        let oldId = addId
        addId = tid
        let idx = e.target.dataset.idx
        let dis = e.target.dataset.dis
        let newL = this.data.newList
        // console.log( dis, idx, tid,'sssssssssss')
        if(dis !== 'true' && oldId !== addId) {
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
    goSign:function(){
        XHR.setSign('',
            (db) => {
                if(db.status === 0){
                    this.setData({
                        signDay: db.data.resign
                    })
                }else{
                    wx.showModal({
                      title: '您已经签到，不能重复签到',
                      showCancel: false,
                      success: function(res) {
                        // if (res.confirm) {
                        //   console.log('用户点击确定')
                        // }
                      }
                    })
                }
            }
        )
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
            url: `../friends/index?id=${e.target.dataset.tid}`
        })
    },
    goMsg:function(e) {
        wx.navigateTo({
            url: `../note/index?id=${e.target.dataset.tid}`
        })
    },
    goAddForum:function() {
        wx.navigateTo({
            url: '../postForum/index'
            // url: '../user/index'
        })
    },
    bindTel:function (){
        wx.navigateTo({
            url: '../bindTel/index'
        })
    },
    onShow:function(){
        if(APPS.HASLOGIN){    // 判断是否登录，是否更新数据
            this.GETUSERINFO()
            this.getCarList()
        }
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
