var APPS = getApp()

Page({
  data:{
    isUserInfo:false,

    userInfo:{}
  },
  onLoad:function(){
    let usin = wx.getStorageSync('_USERINFO')
    let wxus = APPS.USERINFO.userInfo

    console.log(usin,wxus,454545454545)
    if(usin.uid){
      this.setData({
        userInfo:usin,
        isUserInfo:APPS.HASLOGIN
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
