const XHR = require('../../requests/request.js')
var APPS = getApp()
Page({
  data:{},
  onLoad:function(){
    XHR.GA({
      v:1,
      tid:'UA-77901546-9',
      cid:APPS.SESSIONID,
      t:'pageview',
      dh:'bbs.360che.com',
      dp:'/aboutUs/index',        // 页面路径
      dt:'关于我们',    // 页面标题
      cd1: APPS.SESSIONID // 用户识别码
    })
  },
  // onReady:function(){
  //   // 页面渲染完成
  // },
  // onShow:function(){
  //   // 页面显示
  // },
  // onHide:function(){
  //   // 页面隐藏
  // },
  // onUnload:function(){
  //   // 页面关闭
  // }
})
