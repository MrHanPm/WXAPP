var APPS = getApp()

Page({
  data:{
      userInfo:{},
  },
  onLoad:function(){
    let usin = wx.getStorageSync('_USERINFO')
    let wxus = APPS.USERINFO
    if(usin){
      this.setData({
        userInfo:usin
      })
    }else{
      this.setData({
        userInfo:wxus
      })
    }
  },






  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})
