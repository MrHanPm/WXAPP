var APPS = getApp()

Page({
  data:{
    isUserInfo:false,

    userInfo:{},
    per:0
  },
  onLoad:function(){
    if(APPS.HASLOGIN){
      let usin = wx.getStorageSync('_USERINFO')
      let wxus = APPS.USERINFO.userInfo
      if(usin.uid){
        this.setData({
          userInfo:usin,
          isUserInfo:APPS.HASLOGIN,
          per: this.GetPercent(usin.score.score,usin.score.uplimit)
        })
      }else{
        this.setData({
          userInfo:wxus
        })
      }
    }else{
      wx.redirectTo({
          url: '../index'
      })
    }
  },
  GetPercent(num, total) { 
    num = parseFloat(num)
    total = parseFloat(total)
    if (isNaN(num) || isNaN(total)){ 
      return "0"
    }
    return total <= 0 ? "0" : (Math.round(num / total * 10000) / 100.00)
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
