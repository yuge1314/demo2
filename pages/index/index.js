//index.js
//获取应用实例
const app = getApp()
import {
  IndexModel
} from '../../modules/modules.js'
let indexHttp = new IndexModel()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    code:null
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //登录接口开始
let that =this
//商品列表信息
    IndexModel.prototype.getGoodsList().then(res=>{
      console.log(res)
    })
    that.getinfo().then(res =>{
     //code
      console.log(res)
      let code=res.code
   return   code
    }).then(function(obj){
      let msg={
          code:obj,
        encryptedData:null,
      }
      //userinfo
    return  that.getinfo2().then(res =>{
        console.log(res)
        msg.encryptedData = res.encryptedData
        msg.iv = res.iv
        return msg
      })
      
    }).then(function(msg){
      console.log(msg)
      let ss={
        
      }
     wx.request({
       url: 'https://wx.miaov.com/login',
       header: {
         'X-WX-Code': msg.code,
         'X-WX-Encrypted-Data': msg.encryptedData,
         'X-WX-IV': msg.iv
       },
       data:ss,
       success:res =>{
         console.log(res)
       }
     })
    })
 //登录结束  

// console.log(this.getinfo())

  

    // wx.request({
    //   url: 'https://wx.miaov.com/login',
    //   data: { code: code },
    //   method: 'POST',
    //   header: {
    //     'X-WX-Code': code,
    //     'X-WX-Encrypted-Data': userInfo.encryptedData,
    //     'X-WX-IV': userInfo.iv
    //   },
    //   success: function (res) {
    //     // if (res.statusCode == 200) {
    //     // console.log("获取到的openid为：" + res.data)
    //     // that.globalData.openid = res.data
    //     // wx.setStorageSync('openid', res.data)
    //     console.log(res)
    //     // } else {
    //     //   console.log(res.errMsg)
    //     // }
    //   },
    // })
   

    // console.log(indexHttp)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getinfo:function() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          resolve(res)


        }
      })
      
    })
  }
  ,
  getinfo2: function () {
    return new Promise((resolve, reject) => {
      wx.getUserInfo({
        success: res => {
          resolve(res)
        }
      })

    })
  }
})
