var app = getApp();
Page({
  data:{
      userInfo:{},

      viewTab: false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo,
      })
    })
  },
  checkView:function(e){
    let v = e.target.dataset.v
    if(v == '1') {
      this.setData({viewTab: true})
    }else{
      this.setData({viewTab: false})
    }
  },
  onReady:function(){
  },
  onShow:function(){
  },
  onHide:function(){
  },
  onUnload:function(){}
})
