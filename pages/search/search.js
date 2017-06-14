var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var WxNotificationCenter = require('../../utils/WxNotificationCenter.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    location:{}
  },

  onLoad: function (options) {
    var that = this;
    qqmapsdk = new QQMapWX({
      key: '74QBZ-EY2WS-BL3OS-6ERHY-GDSYT-5LFLC'
    });
    that.reloadCurrent();
   
  
  },
  
  reloadCurrent: function () {
    var that = this;
    that.setData({
      address: '正在定位中...',
    });
    qqmapsdk.reverseGeocoder({
      poi_options: 'policy=2',
      get_poi: 1,
      success: function (res) {
        that.setData({
          address: res.result.formatted_addresses.recommend,
          result: res.result.pois,
          city: res.result.address_component.city,
          location: res.result.location
        });
        console.log("是否又重新加载");
      }
     
    });
  },
  geoTapped: function () {
    var that = this;
    var title = that.data.address;
    var location = that.data.location;
    var data = {
      title: title,
      location: location
    }
    WxNotificationCenter.postNotificationName("addressSelectedNotification", data);
    wx.navigateBack();

  },
  addressTapped:function(e){
    console.log(e);
    var title = e.currentTarget.dataset.title;
    var location = e.currentTarget.dataset.location;
    var data = {
      title:title,
      location:location
    }
    // 取出点中的地址，然后使用WxNotification回传给首页
    WxNotificationCenter.postNotificationName("addressSelectedNotification", data);
    wx.navigateBack();
  },
  keywordTyping: function (e) {
    // 键盘不断录入绑定取值
    var keyword = e.detail.value;
    var that = this;
    // 向腾讯地图接口发送请求
    qqmapsdk.getSuggestion({
      keyword: keyword,
      region: that.data.city,
      success: function (res) {
        // console.log(res);
        // 保存地址数组
        that.setData({
          result: res.data
        });
      },
      fail: function (res) {
        // console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
  },
 
})