//app.js
App({
  onLaunch: function () {
    console.log("小程序启动")
    
  },
  globalData: {
    userInfo: null
  },
  login:false,
  data:{
    url:"",
    name:""
  }
})