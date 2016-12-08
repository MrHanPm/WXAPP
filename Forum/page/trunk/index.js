const XHR = require('../../requests/request.js')
var APPS = getApp()
Page({
  data:{
    loading: true,  // 延时加载数据
    isLoding: true, // 是否加载
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
                    tops:Tos
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
