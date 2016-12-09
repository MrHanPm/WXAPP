// page/post-forum/index.js
Page({
  data:{
    postOne:false,
    postTwo:false,
    postThree:false,
    imageList:[],
  },
  postFirst:function(){
    this.setData({
      postOne:!this.data.postOne,
      postTwo:false,
      postThree:false,
    })
  },
  postSecond:function(){
    this.setData({
      postOne:false,
      postTwo:!this.data.postTwo,
      postThree:false,
    })
  },
  postThird:function(){
    this.setData({
      postOne:false,
      postTwo:false,
      postThree:!this.data.postThree,
    })
  },
  chooseImage:function(){
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          imageList:res.tempFilePaths,
        })
        console.log(res.tempFilePaths)
      }
    })
  }
})
