const XHR = require('../../requests/request.js')
var APPS = getApp()
Page({
  data:{
    loading: true,  // 延时加载数据
    tops: 0,
    isShowAZ:false,
    hoverAZ: false,

    AZS:[],
    htoTrunk:[],
    clubList:[]
  },
  onLoad:function(){
    let Wds = APPS.SystemInfo.windowHeight * 2
    XHR.getTrunk('',
        (db) => {
            if(db.status === 0) {
                let AZD = this.data.AZS
                let List = []
                for(let i=0;i < db.data.clublist.length; i++){
                  let item = db.data.clublist[i].firstchar
                  let ts = AZD.indexOf(item)
                  if(ts === -1){
                    AZD.push(item)
                    List.push([])
                  }
                }
                for(let i=0;i < db.data.clublist.length; i++){
                  let item = db.data.clublist[i].firstchar
                  let ids = db.data.clublist[i]
                  let ts = AZD.indexOf(item)
                  if(ts !== -1){
                    List[ts].push(ids)
                  }
                }
                let Heig = AZD.length * 40
                let Tos = (Wds - Heig)/2
                console.log(Wds,Heig,Tos,44444444)
                this.setData({
                    htoTrunk: db.data.hotclublist,
                    clubList: List,
                    AZS: AZD,
                    tops:Tos,
                    loading: false,  // 延时加载数据
                })
            }
        }
    )
  },
  goTop:function(e) {
      let that = this
      this.setData({scrollTop: e.target.dataset.id,isShowAZ:true})
      setTimeout(() => {
            that.setData({
                isShowAZ: false
            });
        }, 800)
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
            title: '提示',
            content:'最多只能关注10个哦～',
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
