const XHR = require('../../requests/request.js')
var APPS = getApp()
Page({
  data:{
      subLoding: false, // 按钮加载状态
      subDisb: false,  // 按钮是否可用

      toisLoding: true, // 主帖是否有更多
      toloding: true, // 主帖是否加载

      isLoding:true, // 回帖是否有更多
      loding: true, // 回帖是否加载

      viewTab: false,  // 切换主贴和回帖视角
      userInfo:{},
      uid:'',
      toForum:[],  // 主贴
      toPage: 1,

      goForum:[],   // 回帖
      goPage: 1

  },
  onLoad:function(options){
    let uid = options.id
    let toJson = {method:'posts', uid:uid}
    let goJson = {method:'replies', uid:uid}
    this.setData({uid:uid})
    this.userMsg(uid)
    this.userForum(toJson)
    this.userForum(goJson)
    XHR.GA({
      v:1,
      tid:'UA-77901546-9',
      cid:APPS.SESSIONID,
      t:'pageview',
      id: options.id,
      dh:'bbs.360che.com',
      dp:'/friends/index',        // 页面路径
      dt: '\u597d\u53cb\u4e2d\u5fc3',    // 页面标题
      cd1: APPS.SESSIONID // 用户识别码
    })
  },
  userMsg:function (uid) {
    let usIf = wx.getStorageSync('_USERINFO')
    XHR.getUserInfo({newbuddyid:usIf.uid,exituid:uid},
        (db) => {
          if(db.status === 0) {
            this.setData({userInfo: db.data})
          }
        }
    )
  },
  toloadMore(){
    let toJson = {method:'posts', uid:this.data.uid}
    this.userForum(toJson)
  },
  loadMore(){
    let goJson = {method:'replies', uid:this.data.uid}
    this.userForum(goJson)
  },
  userForum:function (obj) {
    if(obj.method == 'posts') {
      if(this.data.toloding){
        let toForum = this.data.toForum
        let toPage = this.data.toPage
        obj.page = toPage
        this.setData({toloding:false})
        XHR.getToForum(obj,
          (db) => {
            if(db.status === 0) {
              toPage++
              toForum.push(...db.data)
              if(db.data.length < 10) {
                this.setData({
                  toForum: toForum,
                  toisLoding:false
                })
              } else {
                this.setData({
                  toForum: toForum,
                  toloding: true,
                  toPage: toPage
                })
              }
            }
          }
        )
      }
    }else{
      if(this.data.loding){
        let goForum = this.data.goForum
        let goPage = this.data.goPage
        obj.page = goPage
        this.setData({loding:false})
        XHR.getToForum(obj,
          (db) => {
            if(db.status === 0) {
              goPage++
              goForum.push(...db.data)
              if(db.data.length  < 10) {
                this.setData({
                  goForum: goForum,
                  isLoding: false
                })
              } else {
                this.setData({
                  goForum: goForum,
                  loding: true,
                  goPage: goPage
                })
              }
            }
          }
        )
      }
    }
  },
  checkView:function(e){
    let v = e.target.dataset.v
    if(v == '1') {
      this.setData({viewTab: true})
    }else{
      this.setData({viewTab: false})
    }
  },
  goMsg:function(e) {
    wx.redirectTo({
        url: `../note/index?id=${e.target.dataset.tid}`
    })
  },
  addFriend:function(e){
    this.setData({
      subLoding: true,
      subDisb: true
    })
    let userInfo = this.data.userInfo
    XHR.addDelFriend({operation:'add',newbuddyid:e.target.dataset.uid},
      (db) => {
        if(db.status === 0){
          userInfo.wefans = 1
          this.setData({
            subLoding: false,
            subDisb: false,
            userInfo: userInfo
          })
        }else{
          wx.showToast({
            title: '\u5173\u6ce8\u5931\u8d25',
            icon: 'loading',
            duration: 2000
          })
          this.setData({
            subLoding: false,
            subDisb: false
          })
        }
      }
    )
  },
  delFriend:function(e){
    this.setData({
      subLoding: true,
      subDisb: true
    })
    let userInfo = this.data.userInfo
    XHR.addDelFriend({operation:'delete',newbuddyid:e.target.dataset.uid},
      (db) => {
        if(db.status === 0){
          userInfo.wefans = 0
          this.setData({
            subLoding: false,
            subDisb: false,
            userInfo: userInfo
          })
        }else{
          wx.showToast({
            title: '\u5173\u6ce8\u5931\u8d25',
            icon: 'loading',
            duration: 2000
          })
          this.setData({
            subLoding: false,
            subDisb: false
          })
        }
      }
    )
  },
  onReady:function(){
  },
  onShow:function(){
  },
  onHide:function(){
  },
  onUnload:function(){}
})
