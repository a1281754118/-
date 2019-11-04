// pages/xiugai/xiugai.js
var city=require('./city.js')
import WxValidate from '../../utils/WxValidate';
// var dizhi = require('./dizhi.js')
var that
var list = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dizhi: "",
    uid: "",
    name: "",
    xingbie: "",
    url: "",
    arr: {},
    shuju: [],
    shengfen:"",
    chengshi: "",
    upAvatar: false,
    select: [2, 0],
    range: [],
    form:{
      name:""
    },
    city: city
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
      wx.showLoading({
        title: '加载中...',
        duration: 200,
        mask: true
      });
    this.load()
    setTimeout( ()=> {
      this.dz()
    }, 200)
    this.initValidate()
  
    
  },
  dz(){
    that = this
    var user = { Province: that.data.shengfen, City: that.data.chengshi };
    var city = that.data.city
    var shen = city;
    var currentShen = city.filter(
      function (s) {
        return s.name == user.Province
      }
    )[0];
    var shi = currentShen.city;

    this.data.range = [shen, shi];
    console.log(this.data.range)
    this.setData({
      range: this.data.range,
      select: [city.indexOf(currentShen), currentShen.city.findIndex(function (s) {
        return s.name == user.City
      })]
    })
    console.log(this.data.multiArray)
  },
  change: function (event) {
    console.log(event);
    this.setData({ select: event.detail.value });
  },
  cloumnchange: function (event) {
    console.log(event);
    if (event.detail.column == 0) {
      var shenIndex = event.detail.value;
      var shi = city[shenIndex].city;
      this.setData({
        "range[1]": shi
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  input2(e) {
    console.log(e)
    this.setData({
      name: e.detail.value
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
      url: 'http://localhost:3000/cat/get6', //地址
      data: {},
      header: {
        token
      }, //发送数据
      method: "get", //请求方式
      success: (result) => {
        this.setData({
          uid: result.data.rows[0].Id,
          dizhi: result.data.rows[0].Province + result.data.rows[0].City,
          shengfen: result.data.rows[0].Province,
          chengshi: result.data.rows[0].City,
          name: result.data.rows[0].NickName,
          xingbie: result.data.rows[0].Sex,
          url: result.data.rows[0].AvatarUrl,
          arr: result.data.rows[0],

        })
        console.log(this.data.arr)
      }

    });
  },
  xiugai() {
    var img = this.data.arr.AvatarUrl
    console.log(img)
    var url = this.data.url
    var name = this.data.name
    var select=this.data.select
    var city = this.data.city
    console.log(select)
    console.log(this.data.city)
    var province = city[select[0]].name
    var city = city[select[0]].city[select[1]].name
    var token = wx.getStorageSync('token')
    var dizhi = this.data.multiIndex
    wx.request({
      url: 'http://localhost:3000/cat/up', //地址
      data: {
        name,
        url,
        img,
        province,
        city
      },
      header: {
        token,dizhi
      }, //发送数据
      method: "post", //请求方式
      success: (result) => {
        wx.showLoading({
          title: '修改中...',
          duration: 400,
          mask: true
        });
        setTimeout(function () {
          wx.showToast({
            title: '修改成功',
            icon: '', //默认值是success,就算没有icon这个值，就算有其他值最终也显示success
            duration: 500, //停留时间
          })
        }, 400)
        setTimeout(function () {
          wx.reLaunch({
            url: '../index/index',
          })
        }, 800)
        this.load()
      }

    });
    
  },
  dizhi(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  changeAvatar() {
    var that = this;
    var name = this.data.name
    var province = this.data.shengfen
    var city = this.data.chengshi
    var token = wx.getStorageSync('token')
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://localhost:3000/cat/up', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            name, province, city
          },
          header: {
            token
          }, //发送数据
          success(res) {
            const data = res.data
            console.log(res)
            wx.showLoading({
              title: '修改中...',
              duration: 400,
              mask: true
            });
            setTimeout(function () {
              wx.showToast({
                title: '修改成功',
                icon: '', //默认值是success,就算没有icon这个值，就算有其他值最终也显示success
                duration: 200, //停留时间
              })
            }, 400)
            that.load()
          }, 
          fail(){
            wx.showLoading({
              title: '修改中...',
              duration: 400,
              mask: true
            });
            setTimeout(function () {
              wx.showToast({
                title: '修改失败',
                icon: '', //默认值是success,就算没有icon这个值，就算有其他值最终也显示success
                duration: 200, //停留时间
              })
            }, 400)
            that.load()
          }
        })
      }
      
    })
   
  },

  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  //验证函数
  initValidate() {
    const rules = {
      name: {
        required: true,
        minlength: 2
      }
    }
    const messages = {
      name: {
        required: '请填写姓名',
        minlength: '请输入正确的名称'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  //调用验证函数
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带的数据为：', e.detail.value)
    const params = e.detail.value
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    this.xiugai()
  }
})