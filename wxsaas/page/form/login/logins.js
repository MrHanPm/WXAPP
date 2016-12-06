Page({
    data: {
        showTopTips: false
    },
    showTopTips: function(){
        var that = this;
        this.setData({
            showTopTips: true
        });
        setTimeout(function(){
            that.setData({
                showTopTips: false
            });
        }, 3000);
    },
    
    callPhone: function (e) {
        wx.makePhoneCall({
          phoneNumber: '4006136188'
        })
    },
    goPage: function () {
        wx.redirectTo({
          url: 'login'
        })
    },
    goNext: function () {
        wx.redirectTo({
          url: '../../user/xs/index'
        })
    }
});
