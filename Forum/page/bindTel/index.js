var APPS = getApp()
Page({
    data:{
        USERINFO: {}
    },
    onLoad:function() {
        let usd = APPS.USERINFO.userInfo
        console.log(usd,4444444)
        this.setData({
            USERINFO: usd
        })
    }
})
