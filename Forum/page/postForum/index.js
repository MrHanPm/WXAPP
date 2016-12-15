const XHR = require('../../requests/request.js')
const UT = require( '../../util/util.js' )
const URL = require('../../config.js')
var APPS = getApp()
Page({
  data:{
    showTopTips: false, // 是否显示提醒
    showTopTxt: ' ', // 显示提醒文字

    isForums: false, // 判断是否是专贴
    showForm: true, // 是否显示遮层
    showSmal: true, // 是否显示表情
    showPic: true, // 是否显示图片选择

    disBtn: false, // 是否禁用提交
    binLoding: false, //提交动画

    myFol: [],     // 关注的车型
    tagid:[],  // 同步发布在的论坛

    imageList: [],  // 选择的图片
    message:'',  // 同步输入
    msgVlue:[] // 提交图片值 attachment
  },
  ALT: function (txt) {
      var that = this;
      this.setData({
          showTopTips: true,
          showTopTxt: txt
      });
      setTimeout(function(){
          that.setData({
              showTopTips: false
          });
      }, 3000);
  },
  onLoad:function(props) {
    if(props.id){
      this.setData({isForums:props.id})
    }else{
      this.getCarList()
    }
    
    // this.setData({
    //     USERINFO: APPS.USERINFO.userInfo
    // })
  },
  getCarList:function(){
      XHR.getCarTypeList('',
          (db) => {
              if(db.status === 0){
                  this.setData({
                      myFol: db.data
                  })
              }
              
          }
      )
  },
  postFirst:function(){
    this.setData({
      postOne:!this.data.postOne,
      postTwo:false,
      postThree:false,
    })
  },
  poTagid(e){
    let fid = e.target.dataset.id
    let inx = e.target.dataset.inx
    let is = e.target.dataset.is

    let tagid = this.data.tagid
    let myFol = this.data.myFol
    if(is !== 'true'){
      myFol[inx]['isok'] = true
      tagid.push(fid)
      this.setData({myFol: myFol})
    }else{
      myFol[inx]['isok'] = false
      tagid.splice(tagid.indexOf(fid),1)
      this.setData({myFol: myFol})
    }
  },
  checkForm: function (obj) {
      if(!UT.isNo(obj.subject)){
          this.ALT('标题不能为空');
          return false;
      }
      if(!UT.isNo(obj.message)){
          this.ALT('正文内容不能为空');
          return false;
      }
      if(this.data.isForums){
        // console.log(this.data.isForums)
      }else{
        if(this.data.tagid.length === 0){
          this.ALT('至少选择同步一个论坛');
          return false;
        }
      }
      if(this.data.imageList.length !== this.data.msgVlue.length){
        this.ALT('图片未上传完毕，请稍等片刻发表～')
        return false;
      }
      return true;
  },
  formSubmit(e){
    if(this.checkForm(e.detail.value)){
      let json = {}
      let fids = this.data.tagid.join(',')
      this.setData({
        disBtn: true, 
        binLoding: true
      })
      json.action = 'post'
      json.type = 'terminal'
      json.method = 'topic'
      json.fid = 6
      json.subject = e.detail.value.subject
      json.message = this.data.message
      json.attachment = this.data.msgVlue.join('-')
      json.tagid = fids
      if(this.data.isForums){
        json.tagid = this.data.isForums
      }
      json.ismob = 5
      json.session_id = APPS.SESSIONID
      XHR.postWrite('post',json,
          (db) => {
              if(db.status === 0){
                  wx.navigateBack()
              }else{
                  this.ALT(db.data)
              }
          }
      )
    }
  },
  hideGoToMsg:function(){
      this.setData({
        showForm: true, // 是否显示遮层
        showSmal: true, // 是否显示表情
        showPic: true, // 是否显示图片选择
      })
  },
  addSmal(){
    this.setData({
      showForm: false, // 是否显示遮层
      showSmal: false, // 是否显示表情
      showPic: true, // 是否显示图片选择
    })
  },
  addPhoto(){
    this.setData({
      showForm: false, // 是否显示遮层
      showSmal: true, // 是否显示表情
      showPic: false, // 是否显示图片选择
    })
  },
  getMsgVlue(e){
    this.setData({
      message: e.detail.value
    })
  },
  addPhiz(e){
    let txt = this.data.message
    this.setData({
      message: txt + e.target.dataset.title
    })
    
  },
  chooseImage:function(){
    var that = this
    let imageList = this.data.imageList
    wx.chooseImage({
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'],
      success: function (res) {
        imageList.push(...res.tempFilePaths)
        that.uploadImg(res.tempFilePaths)
        that.setData({
          imageList:imageList
        })
        // console.log(res.tempFilePaths)
      }
    })
  },
  addChooseImage:function(){
    var that = this
    let imageList = this.data.imageList
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['camera'],
      success: function (res) {
        imageList.push(...res.tempFilePaths)
        that.uploadImg(res.tempFilePaths)
        that.setData({
          imageList: imageList,
          showForm: false, // 是否显示遮层
          showSmal: true, // 是否显示表情
          showPic: false, // 是否显示图片选择
        })
      }
    })
  },
  uploadImg(obj){
    var that = this
    let msgVlue = this.data.msgVlue
    let json = {}
    json.session_id = APPS.SESSIONID
    json.action = 'AppMisc'
    json.operation = 'upload'
    json.type = 'empty'
    json.app = 1
    json.filename = 'Filedata'
    for(let src in obj){
      wx.uploadFile({
        url: `${URL}interface/app/wxapp.php`,
        filePath: obj[src],
        name: 'Filedata',
        formData: json,
        success: function(res){
          if(res.statusCode === 200){
            let DB = JSON.parse(res.data)
            if(DB.status === 0){
              let txt = DB.data.src.substring(26,DB.data.src.length)
              txt = txt.substring(0,txt.length-4)
              // console.log(DB.data.src,DB.data.src.length)
              msgVlue.push(txt)
              that.setData({
                msgVlue: msgVlue
              })
            }
          }
          // console.log(res)
          // console.log(that.data.msgVlue)
        }
      })
    }
  },
  delPic(e){
    let img = this.data.imageList
    let url = this.data.msgVlue
    img.splice(e.target.dataset.inx,1)
    url.splice(e.target.dataset.inx,1)
    this.setData({
      imageList: img,
      msgVlue: url
    })
  },
})
