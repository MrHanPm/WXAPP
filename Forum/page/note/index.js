const XHR = require('../../requests/request.js')
const UT = require( '../../util/util.js' )
var APPS = getApp()
let addId // 临时储存点击id

Page({
    data:{
        showTopTips: false, // 是否显示提醒
        showTopTxt: ' ', // 显示提醒文字
        img: 'http://face.360che.com/data/avatar/noavatar_big.gif-120x120.jpg',
        loading: true, // 延时加载数据
        scrollTop: '',
        showFA: false,  // 火箭图标
        isLoding: true,  // 是否加载
        ShareBox: true,  // 分享引导

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
    onLoad:function(options) {
        this.setData({tid: options.id})
        this.upData(options.id)
        XHR.GA({
          v:1,
          tid:'UA-77901546-9',
          cid:APPS.SESSIONID,
          t:'pageview',
          dh:'bbs.360che.com',
          id: options.id,
          dp:'/note/index',        // 页面路径
          dt:'\u8d34\u5b50\u8be6\u60c5\u9875',    // 页面标题
          cd1: APPS.SESSIONID // 用户识别码
        })
    },
    upData:function(tid) {
        let newPage = this.data.nowPage
        let newpostlist = this.data.postlist
        if (this.data.loading) {
            this.setData({loading: false})
            XHR.getDetail({tid: tid, page: newPage,sort:this.data.sortV},
                (db) => {
                    if(db.status === 0) {
                        newPage++
                        let da = `${db.data.thread.pid}`
                        let Dlist = db.data.postlist
                        newpostlist.push(...Dlist)
                        if(Dlist.length < 20){
                            this.setData({
                                thread: db.data.thread,
                                postlist: newpostlist,
                                hots: db.data.hots,
                                comments: db.data.comments[da],
                                isLoding: false
                            })
                        }else{
                            this.setData({
                                thread: db.data.thread,
                                postlist: newpostlist,
                                hots: db.data.hots,
                                comments: db.data.comments[da],
                                nowPage:newPage,
                                loading: true,
                            })
                        }
                    }
                }
            )
        }
    },
    upDataActiv:function(tid) {
        let newPage = this.data.nowPage
        let newpostlist = this.data.postlist
        if (this.data.loading) {
            this.setData({loading: false})
            XHR.getDetail({tid: tid, page: newPage,sort:this.data.sortV},
                (db) => {
                    if(db.status === 0) {
                        newPage++
                        let Dlist = db.data.postlist
                        newpostlist.push(...Dlist)
                        if(Dlist.length < 20){
                            this.setData({
                                postlist: newpostlist,
                                isLoding: false
                            })
                        }else{
                            this.setData({
                                postlist: newpostlist,
                                nowPage:newPage,
                                loading: true,
                            })
                            XHR.GA({
                                v:1,
                                tid:'UA-77901546-9',
                                cid:APPS.SESSIONID,
                                t:'event',
                                dp:`/note/index/id=${tid}`,
                                ec:'\u8bba\u575b',
                                ea:'\u52a0\u8f7d\u4e0b\u4e00\u9875',
                                el:'',
                              })
                        }
                    }
                }
            )
        }
    },
    loadMore:function() {
        this.upDataActiv(this.data.tid)
    },
    sortActiv:function(){
        if(this.data.sortX){
            this.setData({
                sortV:'fanxu',
                postlist: [],
                nowPage: 1,
                loading: true,
                isLoding: true,
                sortX: false
            })
        }else{
            this.setData({
                sortV:'',
                postlist: [],
                loading: true,
                isLoding: true,
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
        let types = e.target.dataset.type
        let oldId = addId
        addId = pid
        
        let idx = e.target.dataset.idx
        let dis = e.target.dataset.dis
        let newL
        if( types== 'hots'){
            newL = this.data.hots
        }else{
            newL = this.data.postlist
        }
        console.log( dis, idx, tid,'sssssssssss')
        if(dis == 'null' && oldId !== addId) {
            XHR.getLaud({tid: tid,pid: pid},
                (db) => {
                    if(db.status === 0) {
                        if(db.data.recommend_count) {
                           newL[idx]['recommend_count'] = db.data.recommend_count 
                           newL[idx]['id'] = '123123'
                        }
                        if( types== 'hots'){
                            this.setData({hots: newL})
                        }else{
                            this.setData({postlist: newL})
                        }
                        XHR.GA({
                            v:1,
                            tid:'UA-77901546-9',
                            cid:APPS.SESSIONID,
                            t:'event',
                            dp:'/note/index',
                            ec:'\u8bba\u575b',
                            ea:'\u70b9\u8d5e\u5e16\u5b50',
                            el:'',
                          })
                    } else {
                        // icon: 'info',
                        // wx.showToast({
                        //   title: db.data,
                          
                        //   duration: 2000
                        // })
                        wx.showModal({
                          title: '提示',
                          content: db.data,
                          showCancel: false,
                          success: function(res) {
                          }
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
        if(dis == '0' && oldId !== addId) {
            XHR.getLaud({tid: tid},
                (db) => {
                    if(db.status === 0) {
                        if(db.data.recommend_count) {
                           newL['recommend_add'] = db.data.recommend_count 
                        }
                        newL['recommend'] = 2
                        this.setData({
                            thread: newL
                        })
                        XHR.GA({
                            v:1,
                            tid:'UA-77901546-9',
                            cid:APPS.SESSIONID,
                            t:'event',
                            dp:'/note/index',
                            ec:'\u8bba\u575b',
                            ea:'\u70b9\u8d5e\u5e16\u5b50',
                            el:'',
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
    addNotes(){
        var that = this
        setTimeout(() => {
            that.postWrite()
        }, 500);
    },
    postWrite:function(){
        if(this.checkForm()){
            let json = {}
            this.setData({
                subLoading:true, // 提交加载
                subDsb:true // 提交限制
            })
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
                            subLoading:false, // 提交加载
                            subDsb:false, // 提交限制
                            inputValue: ''
                        })
                        this.sortActiv()
                        XHR.GA({
                            v:1,
                            tid:'UA-77901546-9',
                            cid:APPS.SESSIONID,
                            t:'event',
                            dp:'/note/index',
                            ec:'\u8bba\u575b',
                            ea:'\u56de\u590d\u5e16\u5b50\u6210\u529f',
                            el:'',
                          })
                    }
                }
            )
        }
    },
    goToMsg:function(e){
        if(APPS.HASLOGIN){
            this.setData({showForm:false,focus:true,pid:e.target.dataset.pid})
        }else{
            wx.redirectTo({
               url: '../bindTel/index'
            })
        }
    },
    hideGoToMsg:function(){
        this.setData({showForm:true})
    },
    checkForm: function () {
        if(!UT.isNo(this.data.inputValue)){
            this.ALT('不能为空，不能低于一个字符');
            return false;
        }
        return true;
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
    ShareBox(){
        if(this.data.ShareBox){
            this.setData({
                ShareBox: false
            })
            XHR.GA({
              v:1,
              tid:'UA-77901546-9',
              cid:APPS.SESSIONID,
              t:'event',
              dp:'/note/index',
              ec:'\u5206\u4eab\u6210\u529f\u002d\u5c0f\u7a0b\u5e8f',
              ea:'\u5206\u4eab\u6210\u529f\u002d\u5c0f\u7a0b\u5e8f',
              el:'',
            })
        }else{
            this.setData({
                ShareBox: true
            })
        }
        
    },
    onShow:function(){},
    onHide:function(){},
    onUnload:function(){}
})
