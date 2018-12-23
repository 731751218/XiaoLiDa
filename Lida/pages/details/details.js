var app = getApp();
Page({

  /**
   * 页面的初始数据
   */


  data: {
    imgUrls: [

    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    circular: true,
    name: '',
    price: '',
    sold: '',
    icon: '',
    describe: '',
    stock: '',
    chooseSize: false,
    animation: {},
    animationData: {},
    commodityNumber: 1,
    activeIndex: 0,
    graphic: [],
    flavor: [{
      name: '默认'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 将传递过来的字符串转化为对象

    var data_index = JSON.parse(options.data_index);
    // console.log(data_index)

    var icon = data_index.icon;

    // 获取轮播图图片
    var img = data_index.img;

    // 循环遍历详情页的轮播部分
    var arr = [];
    for (var x in img) {
      arr.push(img[x]);
    }

    // 获取图文详情图片
    var graphic = data_index.graphic;
    var graphicall = [];
    // 循环遍历详情页的图文详解部分
    for (var i in graphic) {
      graphicall.push(graphic[i]);
    }
    // console.log(graphicall);
    // 把传过来的参数设置到页面中
    this.setData({

      name: data_index.name,

      price: data_index.price.default,

      sold: data_index.sold,

      describe: data_index.describe,

      imgUrls: arr,

      graphic: graphicall,

      stock: data_index.stock,

      icon: icon

    })



    // console.log(bindFocus[2]);

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

  // 防止弹窗穿透
  stopPageScroll: function() {
    return
  },

  //活动详情
  tips: function() {
    wx.showToast({

      title: '暂无活动',
      image: '../images/icon/无活动.png',

      duration: 1000

    })
  },

  // 弹出动画层
  chooseSezi: function(e) {
    // 用that取代this，防止不必要的情况发生
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 500,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(600).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      // 改变view里面的Wx：if
      chooseSize: true
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function() {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 200)
  },


  // 隐藏遮罩层
  hideModal: function(e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(600).step()
    that.setData({
      animationData: animation.export()

    })
    setTimeout(function() {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        chooseSize: false
      })
    }, 200)
  },







  /* 点击减号 */
  reduce: function() {
    var commodityNumber = this.data.commodityNumber;
    // 如果大于1时，才可以减  
    if (commodityNumber > 1) {
      commodityNumber--;
    }

    // 将数值与状态写回  
    this.setData({
      commodityNumber: commodityNumber
    });
  },


  /* 点击加号 */
  plus: function() {
    var commodityNumber = this.data.commodityNumber;
    // 不作过多考虑自增1  
    commodityNumber++;

    // 将数值与状态写回  
    this.setData({
      commodityNumber: commodityNumber
    });
  },



  // 用户评价
  evaluate: function() {
    wx.showToast({

      title: '暂无评价',
      image: '../images/icon/无效订单.png',
      duration: 1000

    })
  },



  shoppingCart: function(e) {
    // var that = this;

    app.globalData.name = this.data.name;
    app.globalData.price = this.data.price;
    app.globalData.icon = this.data.icon;
    // console.log(app.globalData.name);
    
  

    //添加购物车的消息提示框
    wx.showToast({
      title: "添加购物车成功",
      icon: "success",
      durantion: 2000
    })

    // wx.switchTab({

    //   url: '../shopping/shopping'
    // })
  }


})