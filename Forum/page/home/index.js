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
        ShareBox: true,  // 分享引导

        nowPage: 1,
        HASLOGIN: false, // 用户是否登录
        userInfo:{},   // 获取的用户信息
        isUserInfo: false, // 判断获取用户的信息是否完整
        hotNews: [],     // 公告
        newList: [],
        signDay: 0,   // 签到天数
        myFol: []     // 关注的车型
    },
    onPullDownRefresh(){
        this.setData({
            nowPage:1,
            isLoding: true,
            loading: true,
            newList:[],
            hotNews: []
        })
        this.upData()
    },
    onLoad:function() {
        this.upData()
        this.GETUSERINFO()

        XHR.GA({
          v:1,
          tid:'UA-77901546-9',
          cid:APPS.SESSIONID,
          t:'pageview',
          dh:'bbs.360che.com',
          dp:'/home/index',        // 页面路径
          dt:'\u9996\u9875',    // 页面标题
          cd1: APPS.SESSIONID // 用户识别码
        })
    },
    onShow:function(){
        // this.onPullDownRefresh()
        if(APPS.HASLOGIN){    // 判断是否登录，是否更新数据
            this.GETUSERINFO()
        }
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

                        if(db.data.threadlist.length < 20){
                            this.setData({
                                hotNews: newNews,
                                newList: newLists,
                                isLoding: false
                            })
                        }else{
                            this.setData({
                                hotNews: newNews,
                                newList: newLists,
                                nowPage: newPage,
                                loading: true
                            })
                            if(this.data.nowPage >= 2){
                                XHR.GA({
                                    v:1,
                                    tid:'UA-77901546-9',
                                    cid:APPS.SESSIONID,
                                    t:'event',
                                    dp:'/home/index',
                                    ec:'\u8bba\u575b',
                                    ea:'\u52a0\u8f7d\u4e0b\u4e00\u9875',
                                    el:'',
                                })
                            }
                        }
                        wx.stopPullDownRefresh()
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
                    this.getCarList()
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
                if(db.status === 0){
                    this.setData({
                        myFol: db.data
                    })
                }
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
        if(dis < 0 && oldId !== addId) {
            XHR.getLaud({tid: tid},
                (db) => {
                    if(db.status === 0) {
                        if(db.data.recommend_count) {
                           newL[idx]['recommend_add'] = db.data.recommend_count 
                        }
                        newL[idx]['liked'] = 2
                        this.setData({
                            newList: newL
                        })
                        XHR.GA({
                            v:1,
                            tid:'UA-77901546-9',
                            cid:APPS.SESSIONID,
                            t:'event',
                            dp:'/home/index',
                            ec:'\u8bba\u575b',
                            ea:'\u70b9\u8d5e\u5e16\u5b50',
                            el:'',
                          })
                    }else{
                        // wx.showToast({
                        //   title: ,
                        //   duration: 2000
                        // })
                        wx.showModal({
                          title: '提示',
                          content: db.data,
                          showCancel: false,
                          success: function(res) {
                          }
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
                    let usInf = this.data.userInfo
                    usInf.signed = db.data.resign
                    this.setData({
                        userInfo: usInf,
                        signDay: db.data.resign
                    })
                    this.GETUSERINFO()
                    XHR.GA({
                        v:1,
                        tid:'UA-77901546-9',
                        cid:APPS.SESSIONID,
                        t:'event',
                        dp:'/home/index',
                        ec:'\u8bba\u575b',
                        ea:`已签到${db.data.resign}天`,
                        el:'',
                      })
                }else{
                    wx.showModal({
                      title: '提示',
                      content:'您已经签到，不能重复签到',
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
        if(APPS.HASLOGIN){
            wx.navigateTo({
               url: '../postForum/index'
                // url: '../user/index'
               // url: '../bindTel/index'
            })
        }else{
            wx.navigateTo({
               url: '../bindTel/index'
            })
        }
        XHR.GA({
          v:1,
          tid:'UA-77901546-9',
          cid:APPS.SESSIONID,
          t:'event',
          dp:'/home/index',
          ec:'\u8bba\u575b',
          ea:'\u70b9\u51fb\u53d1\u5e16\u6309\u94ae',
          el:'',
        })
    },
    bindTel:function (){
        wx.redirectTo({
            url: '../bindTel/index'
        })
    },
    
    ShareBox(){
        if(this.data.ShareBox){
            this.setData({
                ShareBox: false
            })
            XHR.GA({
              v:1,
              tid:'UA-77901546-9',
              cid:APPS.SESSIONID,
              t:'event',
              dp:'/home/index',
              ec:'\u5206\u4eab\u6210\u529f\u002d\u5c0f\u7a0b\u5e8f',
              ea:'\u5206\u4eab\u6210\u529f\u002d\u5c0f\u7a0b\u5e8f',
              el:'',
            })
        }else{
            this.setData({
                ShareBox: true
            })
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
