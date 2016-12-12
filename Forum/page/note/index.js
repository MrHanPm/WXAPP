const XHR = require('../../requests/request.js')
var APPS = getApp()
let addId // 临时储存点击id

Page({
    data:{
        img: 'http://face.360che.com/data/avatar/noavatar_big.gif-120x120.jpg',
        loading: true, // 延时加载数据
        scrollTop: '',
        showFA: false,  // 火箭图标
        isLoding: true,  // 是否加载

        subLoading:false, // 提交加载
        subDsb:false, // 提交限制
        showForm:true,  // 显示弹窗输入框
        focus:false, 


        nowPage: 1,
        tid: '',
        pid: '',
        thread: {},
        postlist: [],
        comments: [],
        hots: [],
        inputValue: '',
        sortV:'',
        sortX: true
    },
    onLoad:function(options) {
        this.setData({tid: options.id})
        this.upData(options.id)
    },
    upData:function(tid) {
        let tids
        if(tid) {
            tids = tid
        } else {
            tids = this.data.tid
        }
        let newPage = this.data.nowPage
        let newpostlist = this.data.postlist
        if (this.data.loading) {
            this.setData({loading: false})
            XHR.getDetail({tid: tid, page: newPage,items:21,sort:this.data.sortV},
                (db) => {
                    if(db.status === 0) {
                        newPage++
                        let da = `${db.data.thread.pid}`
                        let Dlist = db.data.postlist
                        newpostlist.push(...Dlist)
                        this.setData({
                            thread: db.data.thread,
                            postlist: newpostlist,
                            hots: db.data.hots,
                            comments: db.data.comments[da],
                            nowPage:newPage,
                            loading: true,
                            isLoding: Dlist.length >= 20 ? true : false
                        })
                    }
                }
            )
        }
    },
    upDataActiv:function(tid) {
        let tids = tid
        let newPage = this.data.nowPage
        let newpostlist = this.data.postlist
        if (this.data.loading) {
            this.setData({loading: false})
            XHR.getDetail({tid: tid, page: newPage,items:21,sort:this.data.sortV},
                (db) => {
                    if(db.status === 0) {
                        newPage++
                        let Dlist = db.data.postlist
                        newpostlist.push(...Dlist)
                        this.setData({
                            postlist: newpostlist,
                            nowPage:newPage,
                            loading: true,
                            isLoding: Dlist.length >= 20 ? true : false
                        })
                    }
                }
            )
        }
    },
    loadMore:function() {
        this.upData(this.data.tid)
    },
    sortActiv:function(){
        if(this.data.sortX){
            this.setData({
                sortV:'fanxu',
                postlist: [],
                nowPage: 1,
                sortX: false
            })
        }else{
            this.setData({
                sortV:'',
                postlist: [],
                nowPage: 1,
                sortX: true
            })
        }
        this.upDataActiv(this.data.tid)
    },
    onReady:function(){
        let txt = this.data.thread.subject
        if(txt){
            wx.setNavigationBarTitle({
              title: txt
            })
        }
    },
    rcmdAdd:function(e) {
        let tid = e.target.dataset.tid
        let pid = e.target.dataset.pid
        let oldId = addId
        addId = pid
        
        let idx = e.target.dataset.idx
        let dis = e.target.dataset.dis
        let newL = this.data.postlist
        // console.log( dis, idx, tid,'sssssssssss')
        if(dis !== 'true' && oldId !== addId) {
            XHR.getLaud({tid: tid,pid: pid},
                (db) => {
                    if(db.status === 0) {
                        if(db.data.recommend_count) {
                           newL[idx]['recommend_add'] = db.data.recommend_count 
                        }
                        newL[idx]['rcmd'] = true
                        this.setData({
                            postlist: newL
                        })
                    } else {
                        // icon: 'info',
                        wx.showToast({
                          title: db.data,
                          
                          duration: 2000
                        })
                    }
                }
            )
        }
    },
    miAdd:function(e){
        let tid = e.target.dataset.tid
        let dis = e.target.dataset.dis
        let oldId = addId
        addId = tid
        let newL = this.data.thread
        // console.log( dis, idx, tid,'sssssssssss')
        if(dis !== 'true'&& oldId !== addId) {
            XHR.getLaud({tid: tid},
                (db) => {
                    if(db.status === 0) {
                        if(db.data.recommend_count) {
                           newL['recommend_add'] = db.data.recommend_count 
                        }
                        newL['rcmd'] = true
                        this.setData({
                            thread: newL
                        })
                    } else {
                        // icon: 'info',
                        wx.showToast({
                          title: db.data,
                          
                          duration: 2000
                        })
                    }
                }
            )
        }
    },
    txtInput:function(e){
        this.setData({
          inputValue:e.detail.value
        })
    },
    postWrite:function(){
        let json = {}
        json.action = 'post'
        json.type = 'terminal'
        json.method = 'reply'
        json.ismob = 5
        json.getpid = 1
        json.session_id = APPS.SESSIONID
        json.message = this.data.inputValue
        json.tid = this.data.tid
        json.pid = this.data.pid
        if(this.data.pid == 'false'){
            json.pid = null
        }
        json.attachment = ''
        XHR.postWrite('post',json,
            (db) => {
                if(db.status === 0){
                    this.setData({
                        showForm:true,
                        inputValue: ''
                    })
                    this.sortActiv()
                }
            }
        )
    },
    goToMsg:function(e){
        this.setData({showForm:false,focus:true,pid:e.target.dataset.pid})
    },
    hideGoToMsg:function(){
        this.setData({showForm:true})
    },
    Report:function(e){
        let tid = e.target.dataset.tid
        wx.showActionSheet({
          itemList: ['举报',],
          success: function(res) {
            if (!res.cancel) {
              // console.log(res)
              
                wx.navigateTo({
                    url: `../report/index?id=${tid}`
                })
            }
          }
        })
    },
    goUser:function(e) {
        wx.redirectTo({
            url: `../friends/index?id=${e.target.dataset.tid}`
        })
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
    toBack:function() {
        wx.navigateBack({delta:1})
    },
    goHome:function(){
        let nub = getCurrentPages().length - 1
        wx.navigateBack({delta: nub})
    },
    onShow:function(){},
    onHide:function(){},
    onUnload:function(){}
})
