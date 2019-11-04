// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:"一给窝里giao",
    data1:{},
    loaded:false,
    name:"",
    sf:"",
    cs:"",
    arr:[]
  },
  afterLogin(e) {
    if (wx.getStorageSync('zhuangtai') == true) {
      if (this.data.arr == "") {
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
        var data = wx.getStorageSync('user').userInfo
        this.setData({
          data1: data
        })
        this.load()
      }
    } else {
      wx.showLoading({
        title: '请先登陆...',
        duration: 9999999,
      });
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    console.log("页面隐藏")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("关闭触发")
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    setTimeout(() => {
      wx.stopPullDownRefresh();
      this.load();
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
    console.log("下一页")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("分享触发")
  },
  data1(e){
    console.log(e)
  },
  xiugai(){
    wx.navigateTo({
      url: '../xiugai/xiugai'
    })
  },
  input3(e) {
    console.log(e)
    this.setData({
      dizhi: e.detail.value
    })
  },
  load() {
    var token = wx.getStorageSync('token')
    wx.request({
      url: 'http://localhost:3000/cat/get6',//地址
      data: {},
      header: { token },//发送数据
      method: "get",//请求方式
      success: (result) => {
        this.setData({
          uid: result.data.rows[0].Id,
          sf: result.data.rows[0].Province ,
          cs: result.data.rows[0].City,
          name: result.data.rows[0].NickName,
          xingbie: result.data.rows[0].Sex,
          url: result.data.rows[0].AvatarUrl,
          arr: result.data.rows[0]
        })
        console.log(result.data.rows[0])
        console.log(this.data.url)
      }

    });
  },
})