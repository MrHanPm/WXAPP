const XHR = require('../../requests/request.js')

Page({
  data:{
      subLoding: false,
      subDisb: false,

      viewTab: false,
      userInfo:{},
      toForum:[],  // »ØÌû
      goForum:[]   // Ö÷Ìù

  },
  onLoad:function(options){
    let uid = options.id
    let toJson = {method:'posts', uid:uid}
    let goJson = {method:'replies', uid:uid}
    this.userMsg(uid)
    this.userForum(toJson)
    this.userForum(goJson)
  },
  userMsg:function (uid) {
    XHR.getUserInfo({exituid:uid},
        (db) => {
          if(db.status === 0) {
            this.setData({userInfo: db.data})
          }
        }
    )
  },
  userForum:function (obj) {
    XHR.getToForum(obj,
      (db) => {
        if(db.status === 0) {
          if(obj.method == 'posts') {
            this.setData({toForum: db.data})
          } else {
            this.setData({goForum: db.data})
          }
        }
      }
    )
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
    XHR.addDelFriend({operation:'add',uid:e.target.dataset.uid},
      (db) => {
        if(db.status === 0){
          userInfo.isfriend = 1
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
    XHR.delDelFriend({operation:'delete',uid:e.target.dataset.uid},
      (db) => {
        if(db.status === 0){
          userInfo.isfriend = 0
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
