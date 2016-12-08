const XHR = require('../../requests/request.js')

Page({
  data:{
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
  onReady:function(){
  },
  onShow:function(){
  },
  onHide:function(){
  },
  onUnload:function(){}
})
