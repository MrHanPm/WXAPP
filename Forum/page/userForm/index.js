const XHR = require('../../requests/request.js')
var APPS = getApp()
Page({
    data:{
        loading: true,  // 延时加载数据

        myFol: []     // 关注的车型
    },
    onLoad:function() {
        
        this.getCarList()
    },
    getCarList:function(){
        XHR.getCarTypeList('',
            (db) => {
                if(db.status === 0){
                    this.setData({
                        myFol: db.data,
                        loading: false
                    })
                }
                
            }
        )
    },
    delFavorties:function(e){
        let dix = e.target.dataset.dix
        let clubList = this.data.myFol
        XHR.addFavorties({operation:'delfavorites',id:e.target.dataset.id},
            (db) => {
                if(db.status === 0){
                    clubList.splice(dix,1)
                    this.setData({myFol: clubList})
                }else{
                    wx.showModal({
                        title: '提示',
                        content: db.data,
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
})
