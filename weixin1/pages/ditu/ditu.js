// pages/ditu/ditu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: '',
    longitude: '',
    latitude1: '',
    longitude1: '',
    shortAddress: '',
    detailAddress: '',
    scale: 18,
    controls: [],
    markers: [],
  },
  backToMyposition(e) {
    console.log(this.data.latitude1)
    if (e.controlId == 1) {
      this.setData({
        latitude: this.data.latitude1,
        longitude: this.data.longitude1,
        scale: 14,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.getLocation({
      type: 'wgs84',
      altitude:true,
      success: (res)=> {
        console.log(res.latitude, res.longitude);
        this.setData({
          latitude1: res.latitude,
          longitude1: res.longitude,
          scale: 18,
          accuracy : res.accuracy
        })
      }
    })
    console.log(options)
    this.setData({
      detailAddress: options.name,
      shortAddress: options.dizhi,
      latitude: options.lat,
      longitude: options.log,
      controls: [{
        id: 1,
        iconPath: '/img/shouye11-copy.png',
        position: {
          left: 10,
          top: 10,
          width: 30,
          height: 30,
        },
        clickable: true
      }],
      markers: [{
      
        id: 0,
        latitude: options.lat,
        longitude: options.log,
        width: 20,
        height: 20,
        callout: {
          content: options.dizhi,
          padding: 10,
          display: 'ALWAYS',
          textAlign: 'center'
        }

      }]
    })
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
  ditu: function (event) {
    var lat = Number(this.data.latitude);
    var lon = Number(this.data.longitude);
    var bankName = event.currentTarget.dataset.bankname;
    console.log(event);
    console.log(lon);
    wx.openLocation({
      type: 'gcj02',
      latitude: lat,
      longitude: lon,
      name: bankName,
      scale: 28
    })
  },
})