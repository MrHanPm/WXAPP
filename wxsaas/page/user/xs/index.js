const XHR = require('../../../requests/request.js')

Page({
    data: {
        tabs: ["待跟进", "跟进中", "已成交", "已战败"],
        activeIndex: "0",
        sliderOffset: 0,
        sliderLeft: 0,
        offSetList:0
    },
    onLoad: function () {
        var that = this;
        wx.getSystemInfo({
            success: function(res) {
                // console.log(res.windowWidth)
                let wh = res.windowWidth / 4
                let zu = []
                for(let i=0;i<4;i++){
                    zu.push(Math.round(i*wh))
                }
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - wh) / 2,
                    offSetList: zu
                });
            }
        });
    },
// 待跟进
    RobList: function () {
        XHR.getRobList()
    },
// 跟进中
    ClueUpList: function () {
        XHR.getClueUpList()
    },
// 已成交
    CluesList: function () {
        XHR.getCluesList()
    },
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        })
    },
    movTabs: function (e) {
        // console.log(this.data['offSetList'])
        this.setData({
            sliderOffset: this.data['offSetList'][e.detail.current],
            activeIndex: e.detail.current
        })
    },
    loadMore: function (e) {
        console.log(e, 'loadMore')

    }




});
