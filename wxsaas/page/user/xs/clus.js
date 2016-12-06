Page({
    data:{
        hidden1: false
    },
    maskShow:function(){
      this.setData({
        hidden1: false
      })
    },
    maskHide:function(){
      console.log(this,"this is ok");
      this.setData({
        hidden1: true
      })
    }
})
