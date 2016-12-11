const XHR = require('../../requests/request.js')
var APPS = getApp()
let addId // 临时储存点击id
Page({
  data:{
    loading: true,  // 延时加载数据
    isLoding: true, // 是否加载
    scrollTop: '',
    showFA: false,   // 火箭图标

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
          XHR.getHotTen({page: newPage,tagid:Tid},
              (db) => {
                  if(db.status === 0) {
                      newPage++
                      newLists.push(...db.data)
                      this.setData({
                          newList: newLists,
                          nowPage: newPage,
                          loading: true
                      })
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
    let dix = e.target.dataset.dix
    let inx = e.target.dataset.inx
    let htoTrunk = this.data.htoTrunk
    let clubList = this.data.clubList
    XHR.addFavorties({operation:'favorites',id:e.target.dataset.id,description:e.target.dataset.img},
      (db) => {
        if(db.status === 0){
          if(inx == 'false'){
            htoTrunk[dix].isfav = true
            this.setData({htoTrunk:htoTrunk})
          }else{
            clubList[inx][dix].isfav = true
            this.setData({clubList:clubList})
          }
        }else{
          wx.showModal({
            title: '最多只能关注10个哦～',
            content:'',
            showCancel: false,
            success: function(res) {
              // if (res.confirm) {
              //   console.log('用户点击确定')
              // }
            }
          })
        }
      }
    )
  },
  delFavorties:function(e){
    let dix = e.target.dataset.dix
    let inx = e.target.dataset.inx
    let htoTrunk = this.data.htoTrunk
    let clubList = this.data.clubList
    XHR.addFavorties({operation:'delfavorites',id:e.target.dataset.id},
      (db) => {
        if(db.status === 0){
          if(inx == 'false'){
            htoTrunk[dix].isfav = false
            this.setData({htoTrunk:htoTrunk})
          }else{
            clubList[inx][dix].isfav = false
            this.setData({clubList:clubList})
          }
        }else{
          wx.showModal({
            title: '最多只能关注10个哦～',
            showCancel: false,
            success: function(res) {
              // if (res.confirm) {
              //   console.log('用户点击确定')
              // }
            }
          })
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
