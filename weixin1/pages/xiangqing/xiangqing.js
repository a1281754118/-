// pages/xiangqing/xiangqing.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    xiangqing:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var id=options.id
    var token = wx.getStorageSync('token')
    wx.request({
      url: 'http://localhost:3000/cat/get5',//地址
      data: {  id },
      header: { token },//发送数据
      method: "get",//请求方式
      success: (result) => {
        this.setData({
          xiangqing: result.data.rows,
        })

      }

    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  ditu(e){
    console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: '../ditu/ditu?dizhi=' + e.currentTarget.dataset.shuju + '&lat=' + e.currentTarget.dataset.lat + '&log=' + e.currentTarget.dataset.log + '&name=' + e.currentTarget.dataset.name,
    })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  xiadan(event){
    console.log(event)
    wx.navigateTo({
      url: '../goumai/goumai?id=' + event.currentTarget.dataset.id + '&&price=' + event.currentTarget.dataset.price + '&&name=' + event.currentTarget.dataset.name,
    })
  }
})