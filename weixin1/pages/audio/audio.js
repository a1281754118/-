// pages/audio/audio.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
      arr:[],
      arr1:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(1111111)
    this.setData({
      index: options.index
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
    setTimeout(() => {
      wx.stopPullDownRefresh();
      this.dingdanguanli();
      wx.showToast({
        title: '刷新成功',
        icon: '', //默认值是success,就算没有icon这个值，就算有其他值最终也显示success
        duration: 500, //停留时间
      })
    }, 500)
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
  afterLogin(e) {
    if (wx.getStorageSync('zhuangtai') == true) {
      if(this.data.arr==""){
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
        this.dingdanguanli()
      }
    } else {
      wx.showLoading({
        title: '请先登陆...',
        duration: 9999999,
      });
    }

  },
  changeTabbar(e){
    console.log(e.currentTarget.dataset.id)
    this.setData({ 
      index: e.currentTarget.dataset.id 
      })
      this.dingdanguanli()
  },
  dingdanguanli(){
    var token = wx.getStorageSync('token')
    var index = this.data.index
    wx.request({
      url: 'http://localhost:3000/cat/dingdan',//地址
      data: { index },
      header: { token },//发送数据
      method: "get",//请求方式
      success: (result) => {
        console.log(result.data.rows)
        
        this.setData({
          arr: result.data.rows,
        })
      }
    });
  },
  dingdan(event){
      console.log(event)
      wx.navigateTo({
        url: '../fukuan/fukuan?id=' + event.currentTarget.dataset.id,
      })
    
  }
})