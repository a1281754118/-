Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  pageLifetimes: {
    //所在页面显示时调用
    show() {
      //执行查询
      console.log(wx.getStorageSync('token'))
      if (!wx.getStorageSync('token')) {
        wx.getSetting({
          success: (res) => {
            if (res.authSetting["scope.userInfo"]) {
              //为了避免加密的数据过期，重新获取用户数据
              wx.getUserInfo({
                success:(res)=>{
                  wx.setStorageSync("user", res);
                 console.log(res)
                  
                }
              })
              
              this.login()
            }
          }
        })
      } else {
      
        this.setData({
          needShow: false
        })
        this.triggerEvent("logined");
      }
    }
  },
  attached() {


  },
  /**
   * 组件的初始数据
   */
  data: {
    needShow: true
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    getuserinfo(event) {
      console.log(event)
      if (event.detail.errMsg =="getUserInfo:ok"){
        this.login();
        wx.setStorageSync("user", event.detail)
        //this.triggerEvent("logined");
      }
    },
    login() {

      wx.login({
        success:  (res)=> {
          console.log(res)
          var code = res.code;
          var userdata = wx.getStorageSync("user");
          var postData = {
            code: code,
            encryptedData: userdata.encryptedData,
            iv: userdata.iv
          };
          wx.request({
            url: 'http://localhost:3000/cat/login',
            data: postData,
            method: 'post',
            success: (result) => {
              console.log(result);
              if(result.data.success){
                wx.setStorageSync("token", result.data.token);
                wx.setStorageSync("zhuangtai", result.data.success);
                this.setData({
                  needShow: false
                })
                
                this.triggerEvent("logined");
              }else{
                wx.setStorageSync("zhuangtai", result.data.success);
              }
            }
          })
        }
      })
      
    },
  }
})