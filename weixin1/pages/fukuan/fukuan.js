// pages/fukuan/fukuan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:[],
    status:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options.id)
    var token = wx.getStorageSync('token')
    var id = options.id
    wx.request({
      url: 'http://localhost:3000/cat/dingdan/get2',//地址
      data: { id },
      header: { token },//发送数据
      method: "get",//请求方式
      success: (result) => {
        console.log(result.data.rows)
        for (var i = 0; i < result.data.rows.length; i++) {
          var x = result.data.rows[i].UseDate + ""
          var y = x.substring(0, 7)

          var z = x.substring(11, 13)
          var a = (parseInt(z) + 8)
          var b = x.substring(8, 10)
          if (a == 24) {
            var c = y + '-' + (parseInt(b) + 1)
          }
          result.data.rows[i].UseDate = c
          // console.log(y)
          console.log(result.data.rows[i])
        }
        this.setData({
          arr: result.data.rows[0],
          status: result.data.rows[0].Status,
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  tuikuan(){
    var token = wx.getStorageSync('token')
    var fukuan = '3'
    var id = this.data.arr.Id
    wx.request({
      url: 'http://localhost:3000/cat/fukuan',//地址
      data: { fukuan, id },
      header: { token },//发送数据
      method: "post",//请求方式
      success: (result) => {
        console.log(result.data.rows)
      }
    });
    wx.showLoading({
      title: '退款中...',
      duration: 200,
      mask: true
    });
    setTimeout(function () {
      wx.showToast({
        title: '退款成功',
        icon: '', //默认值是success,就算没有icon这个值，就算有其他值最终也显示success
        duration: 300, //停留时间
      })
    }, 100)
    setTimeout(function () {
      wx.reLaunch({
        url: '../audio/audio?index=' + '3',
      })
    }, 1000)
  },
  goumai(){
    //判断=0为付款
    if (this.data.status==0){
      var token = wx.getStorageSync('token')
      var fukuan='1'
      var id=this.data.arr.Id
      wx.request({
        url: 'http://localhost:3000/cat/fukuan',//地址
        data: { fukuan,id },
        header: { token },//发送数据
        method: "post",//请求方式
        success: (result) => {
          console.log(result.data.rows)
        }
      });
      wx.showLoading({
        title: '付款中...',
        duration: 200,
        mask: true
      });
      setTimeout(function () {
        wx.showToast({
          title: '付款成功',
          icon: '', //默认值是success,就算没有icon这个值，就算有其他值最终也显示success
          duration: 300, //停留时间
        })
 
      }, 100)
        setTimeout(function () {
          wx.reLaunch({
            url: '../audio/audio?index='+'1',
          })
        }, 1000)
     
    } else if (this.data.status == 1){
      var token = wx.getStorageSync('token')
      var fukuan = '2'
      var id = this.data.arr.Id
      wx.request({
        url: 'http://localhost:3000/cat/fukuan',//地址
        data: { fukuan, id },
        header: { token },//发送数据
        method: "post",//请求方式
        success: (result) => {
          console.log(result.data.rows)
        }
      });
      setTimeout(function () {
        wx.reLaunch({
          url: '../audio/audio?index=' + '2',
        })
      }, 1000)
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})