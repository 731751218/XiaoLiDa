Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: ['泡面搭档', '可口饮料'],
    activeIndex: 0,
    alldata: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '努力加载中',
    })

    setTimeout(function() {
      wx.hideLoading()
    }, 500)

    var page = this;

    // 请求数据
    wx.request({
      // 请求数据
      url: 'http://localhost:3000/alldata?type=noodles',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var data = res.data;
        // console.log(data);
        // 存储请求的数据noodlesdata
        wx.setStorage({
          key: "noodlesdata",
          data: data
        })
        page.setData({
          alldata: data
        })
      }

    })

    
    
    
    
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

   
   
    // console.log("数据存储成功")


    // 请求数据drinks
    wx.request({

      // 请求饮料数据
      url: 'http://localhost:3000/alldata?type=drinks',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var data = res.data;
        wx.setStorage({
          key: "drinksdata",
          data: data
        })
        // console.log(data);

      }

    })

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

  onPageScroll: function(e) {
    if (e.scrollTop < 0) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },
  // 选项卡切换
  tabClick: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    // console.log(e.currentTarget.dataset)
    if (index == 0 ) {
      

      wx.getStorage({
        key: 'noodlesdata',
        success: function (res) {
          var data = res.data;
          that.setData({
            alldata: data,
            activeIndex: index
          })
        }
      })



    } else if(index ==1 ) {
      // 获取本地的drinksdata数据
      var data = wx.getStorageSync('drinksdata');
        // console.log(data)
        
        that.setData({
          alldata: data,
          activeIndex: index
        })

      

    }
      

      

    
  },

  tal: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;

    var alldata = JSON.stringify(that.data.alldata[index]);
    // console.log(alldata);

    // 页面传参
    wx.navigateTo({
      url: '../details/details?data_index=' + alldata
    })
  }





})