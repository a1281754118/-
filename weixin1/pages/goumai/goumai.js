// pages/goumai/goumai.js
import WxValidate from '../../utils/WxValidate';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    price: '',
    name: '',
    date:"",
    yonghuname:"",
    mobloe:"",
    quantity:"1",
    price1:"",
    form: {
      name: '',
      phone: '',
      addtime:'',
    },
    insertId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.initValidate()//验证规则函数
    console.log(options)
    this.setData({
      id: options.id,
      price: options.price,
      name: options.name,
      
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      price1: this.data.price
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
  date(e){
    this.setData({
      date:e.detail.value
    })
  },
  input(e) {
    console.log(e)
    this.setData({
      yonghuname: e.detail.value
    })
  },
  input2(e) {
    console.log(e)
    this.setData({
      moblie: e.detail.value
    })
  },
  input4(e) {
    console.log(e)
    this.setData({
      date: e.detail.value
    })
  },
  input3(e) {
    console.log(e)
    var x=this.data.price
    var y=e.detail.value
    this.setData({
      quantity: e.detail.value,
      price1:y*x
    })
    console.log(this.data.price1)
  },
  goumai(){
    this.initValidate()
    var menpiaoid=this.data.id
    var yonghuid = wx.getStorageSync('token')
    var token = wx.getStorageSync('token')
    var name = this.data.yonghuname
    var moblie=this.data.moblie
    var date=this.data.date
    var quantity = this.data.quantity
    var price = this.data.price
    var zongjinger= this.data.price1
    console.log(this.data)
 
    
    wx.showModal({
      title: '提示',
      content: '下单完成后请在10分钟内完成支付否则将取消订单',
      success:  (res)=> {
        if (res.confirm) {
          wx.request({
            url: 'http://localhost:3000/cat/add',//地址
            data: { menpiaoid, yonghuid, name, moblie, date, quantity, price, zongjinger },
            header: { token },//发送数据
            method: "post",//请求方式
            success: (result) => {
              console.log(result.data.result.insertId)
              this.setData({
                insertId: result.data.result.insertId
              })
              wx.showLoading({
                title: '下单中...',
                duration: 200,
                mask: true
              });
              setTimeout(function () {
                wx.showToast({
                  title: '下单成功',
                  icon: '', //默认值是success,就算没有icon这个值，就算有其他值最终也显示success
                  duration: 300, //停留时间
                })
              }, 400)
              
              setTimeout(()=> {
                var id = this.data.insertId
                wx.request({
                  url: 'http://localhost:3000/cat/shanchu',//地址
                  data: { id },
                  header: { token },//发送数据
                  method: "post",//请求方式
                  success: (result) => {
                  }
                });
                wx.reLaunch({
                  url: '../audio/audio?index=' + '0',
                })
              }, 1000)
            }

          });

          console.log('点击确认回调')
        } else {
          wx.showToast({
            title: '你取消了订单 X',
            icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
            duration: 500
          })

          console.log('点击取消回调')
        }
      }
    })
  },

  //报错 
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
      },
      phone: {
        required: true,
        tel: true
      },
      addtime:{
        required: true,
        dateISO:true,
        date:true
      },
      shuliang:{
        required: true,
        digits:true
      }
    }
    const messages = {
      name: {
        required: '请填写姓名',
        minlength: '请输入正确的名称'
      },
      phone: {
        required: '请填写手机号',
        tel: '请填写正确的手机号'
      },
      addtime: {
        required: '请输入日期',
        dateISO: '请输入正确日期',
        date:"请输入有效日期"
      },
      shuliang: {
        required: '请输入购买数量',
        digits: "购买数量只能为数字"
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
    this.goumai()
  }
})