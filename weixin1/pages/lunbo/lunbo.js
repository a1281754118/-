var token=wx.getStorageSync('token')
Page({
  data: {
    imgUrls: [
      
    ],
    img:[],
    remen:[],
    keiwode:'',
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 1000,
    aa:1,
    page:0,
    qinqiu:false,
    jiazai:false,
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  add(){
    console.log(this.data)
    this.setData({
      aa:this.data.aa+1
    })
  },
  afterLogin(e) {
    if (wx.getStorageSync('zhuangtai') == true) {
      if (this.data.remen == "") {
        wx.showLoading({
          title: '加载中...',
          duration: 200,
          mask: true
        });
        setTimeout(function () {
          wx.showToast({
            title: '加载成功',
            icon: '', //默认值是success,就算没有icon这个值，就算有其他值最终也显示success
            duration: 300, //停留时间
          })
        }, 400)
        console.log('登陆后执行')
        this.load()
      }
    } else {
      wx.showLoading({
        title: '请先登陆...',
        duration: 9999999,
      });
    }

  },
  onLoad: function (options) {
  },
  load(){
    console.log("页面加载完成")
    var token = wx.getStorageSync('token')
    wx.request({
      url: 'http://localhost:3000/cat/get',//地址
      data: {},//发送数据
      header: { token },
      method: "get",//请求方式
      success: (result) => {

        this.setData({
          imgUrls: result.data.rows
        })
      }
    });
    wx.request({
      url: 'http://localhost:3000/cat/get1',//地址
      data: {},
      header: { token },//发送数据
      method: "get",//请求方式
      success: (result) => {

        var arr = [[]];
        result.data.rows.forEach((item) => {
          if (arr[arr.length - 1].length >= 5) {
            arr.push([])
          }
          arr[arr.length - 1].push(item)
        })

        this.setData({
          img: arr
        })
      }
    });
    this.data.page = 1
    var page = this.data.page
    wx.request({

      url: 'http://localhost:3000/cat/get3',//地址
      data: { page },
      header: { token },//发送数据
      method: "get",//请求方式
      success: (result) => {
        console.log(result.data.rows)
        this.setData({
          remen: result.data.rows
        })
      }
    });
  },
  meishi4(event) {
    console.log(event)
    wx.navigateTo({
      url: '../meishi/meishi?id=' + event.currentTarget.dataset.id,
    })
  },
  input(e){
    console.log(e)
    this.setData({
      keiwode: e.detail.value
    })
    // console.log(this.data.keiwode)
  },
  search(){
    var token = wx.getStorageSync('token')
    this.data.page = 1
    this.data.qinqiu=false
    var page = this.data.page
    console.log(2111)
    var keyword=this.data.keiwode
    wx.request({
      url: 'http://localhost:3000/cat/get3',//地址
      data: { keyword, page},
      header: { token },//发送数据
      method: "get",//请求方式
      success: (result) => {
        console.log(result.data.rows)
        this.setData({
          remen: result.data.rows
        })
      }
    });
  },
  onReachBottom: function () {
    var token = wx.getStorageSync('token')
   if(this.data.qinqiu==false){
     this.data.page++
     var page = this.data.page
     var keyword = this.data.keiwode
     wx.request({
       url: 'http://localhost:3000/cat/get3',//地址
       data: { page, keyword},
       header: { token },//发送数据
       method: "get",//请求方式
       success: (result) => {
         console.log(page)
         console.log(result.data.rows)
         result.data.rows.forEach((err) => {
           console.log(err)
           this.data.remen.push(err)
           console.log(this.data.remen)
         })
         setTimeout(function(){
           console.log(1111)
         },1000)
         this.setData({
           remen: this.data.remen,
           qinqiu: true,
           
         })
       }
     });
   }else{
     console.log("没有数据了")
   }
    
  },
  //   * 页面相关事件处理函数--监听用户下拉动作
  //  */
  onPullDownRefresh: function () {
    
    setTimeout( ()=> {
      wx.stopPullDownRefresh();
      this.search();
      wx.showToast({
        title: '刷新成功',
        icon: '', //默认值是success,就算没有icon这个值，就算有其他值最终也显示success
        duration: 500, //停留时间
      })
    }, 500)
   
    
  },
  xiangqing(event){
    console.log(event.currentTarget.dataset.id)
    // wx.setStorageSync("xiangqingid", event.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../xiangqing/xiangqing?id=' + event.currentTarget.dataset.id,
    })
  }
})