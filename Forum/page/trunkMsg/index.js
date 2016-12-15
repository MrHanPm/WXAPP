const XHR = require('../../requests/request.js')
var APPS = getApp()
let addId // 临时储存点击id
Page({
  data:{
    loading: true,  // 延时加载数据
    isLoding: true, // 是否加载
    scrollTop: '',
    showFA: false,   // 火箭图标
    ShareBox: true,  // 分享引导

    nowPage: 1,
    Tid:'',
    Trunk:{},
    newList: []
  },
  onLoad:function(options){
    this.setData({Tid:options.id})
    this.upData(options.id)
  },
  upData:function(Tid) {
      let newPage = this.data.nowPage
      let newLists = this.data.newList
      if (this.data.loading) {
          this.setData({loading: false})
          XHR.getHotList({page: newPage,tagid:Tid},
              (db) => {
                  if(db.status === 0) {
                    if(db.data.club.threads > 0) {
                      newPage++
                      newLists.push(...db.data.threadlist)
                      this.setData({
                          newList: newLists,
                          nowPage: newPage,
                          Trunk: db.data.club,
                          loading: true,
                          isLoding: db.data.threadlist.length < 20 ? false : true
                      })
                    }else{
                      newPage++
                      newLists.push(...db.data.threadlist)
                      this.setData({
                          newList: newLists,
                          nowPage: newPage,
                          loading: true,
                          isLoding: db.data.threadlist.length < 20 ? false : true
                      })
                    }
                  }
              }
          )
      }
  },
  loadMore:function() {
      this.upData(this.data.Tid)
  },
  goTop:function() {
    this.setData({scrollTop: 'HD'})
  },
  onSol:function(e) {
      if (e.detail.scrollTop > 560){
          this.setData({
              showFA: true,
              scrollTop:''
          })
      } else {
          this.setData({
              showFA: false
          })
      }
  },
  goUser:function(e) {
      wx.navigateTo({
          url: `../friends/index?id=${e.target.dataset.tid}`
      })
  },
  goMsg:function(e) {
      wx.navigateTo({
          url: `../note/index?id=${e.target.dataset.tid}`
      })
  },
  addFavorties:function(e){
    let Trunk = this.data.Trunk
    XHR.addFavorties({operation:'favorites',id:e.target.dataset.id,description:e.target.dataset.img},
      (db) => {
        if(db.status === 0){
            Trunk.followed = true
            this.setData({Trunk: Trunk})
        }else{

        }
      }
    )
  },
  delFavorties:function(e){
    let Trunk = this.data.Trunk
    XHR.addFavorties({operation:'delfavorites',id:e.target.dataset.id},
      (db) => {
        if(db.status === 0){
            Trunk.followed = false
            this.setData({Trunk: Trunk})
        }else{
         
        }
      }
    )
  },
  rcmdAdd:function(e) {
      let tid = e.target.dataset.tid
      let oldId = addId
      addId = tid
      let idx = e.target.dataset.idx
      let dis = e.target.dataset.dis
      let newL = this.data.newList
      // console.log( dis, idx, tid,'sssssssssss')
      if(dis !== 'true' && oldId !== addId) {
          XHR.getLaud({tid: tid},
              (db) => {
                  if(db.status === 0) {
                      if(db.data.recommend_count) {
                         newL[idx]['recommend_add'] = db.data.recommend_count 
                      }
                      newL[idx]['rcmd'] = true
                      this.setData({
                          newList: newL
                      })
                  }else{
                      wx.showToast({
                        title: db.data,
                        duration: 2000
                      })
                  }
              }
          )
      }
  },
  toBack:function() {
      wx.navigateBack({delta:1})
  },
  goAddForum:function(e) {
      wx.redirectTo({
         url: `../postForum/index?id=${e.target.dataset.id}`
      })
  },
  ShareBox(){
      if(this.data.ShareBox){
          this.setData({
              ShareBox: false
          })
      }else{
          this.setData({
              ShareBox: true
          })
      }
      
  }

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
