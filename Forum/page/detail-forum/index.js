var app = getApp();
Page({
  data:{
      userInfo:{},
      browse:'8079',
      date:'2016-11-30 10:42',
      flour:'1楼',
      title:'长途卡男说车 货车安全小细节',
      titleTime:'1分钟',
      titleContent:'这几天经常看论坛 今天在天津港没卸了车 躺着实在没事干也睡不着就忍不住寂寞了想发个贴叨叨叨这些事…',
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