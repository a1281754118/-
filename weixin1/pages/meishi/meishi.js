// pages/meishi/meishi.js
var token = wx.getStorageSync('token')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:[],
    shuju:[],
    page:1,
    imgUrls:[],
    toView:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync('token')
    console.log(options)
    wx.request({
      url: 'http://localhost:3000/cat/get1',//地址
      data: {},
      header: { token },//发送数据
      method: "get",//请求方式
      success: (result) => {
        this.setData({
          imgUrls: result.data.rows
        })
        console.log(this.data.imgUrls)

      }
      
    });
    
    console.log(options)
    var id = options.id
    this.data.page = 1
    var page = this.data.page
    var id1 = 'view' + options.id // 定位view的id
    wx.request({
      url: 'http://localhost:3000/cat/get4',//地址
      data: {page,id},
      header: { token },//发送数据
      method: "get",//请求方式
      success: (result) => {
        this.setData({
          shuju: result.data.rows,
          toView:id1
        })
      
      }
     
    });
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    if (this.data.qinqiu == false) {
      this.data.page++
      var page = this.data.page
      var keyword = this.data.keiwode
      wx.request({
        url: 'http://localhost:3000/cat/get4',//地址
        data: { page, keyword },
        header: { token },//发送数据
        method: "get",//请求方式
        success: (result) => {
          console.log(result.data.rows)
          result.data.rows.forEach((err) => {
            console.log(err)
            this.data.remen.push(err)
            console.log(this.data.remen)
          })
          this.setData({
            remen: this.data.remen,
            qinqiu: true
          })
        }
      });
    } else {
      console.log("没有数据了")
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  dianji(e){
    console.log(e)
    var id = e.currentTarget.dataset.id
    var token = wx.getStorageSync('token')
    wx.request({
      url: 'http://localhost:3000/cat/get4',//地址
      data: { id },
      header: { token },//发送数据
      method: "get",//请求方式
      success: (result) => {
        this.setData({
          shuju: result.data.rows
        })
      }

    });
    var id = e.currentTarget.id // 定位view的id
    this.setData({
      toView: id
    })
    console.log(this.data.toView)
  },
  xiangqing(event){
    wx.navigateTo({
      url: '../xiangqing/xiangqing?id=' + event.currentTarget.dataset.id,
    })
  }
})