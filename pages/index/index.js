var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var WxNotificationCenter = require('../../utils/WxNotificationCenter.js');
var qqmapsdk;
var app = getApp();

Page({
  data: {
    address:'海宁',
    hasLocation: false,
    storeList:[],
    navbar: ['全部', '推荐', '热门'],
    currentNavbar: 0,
    hidden:true,
    detail_store: '',
    detail_discount:null,
    discountModal:{},
    isScroll:true,
    aa:"jfkdjfkd\nfjed"
    
  },

  onLoad: function (options) {
    var that = this;
    that.reloadCurrent();
    WxNotificationCenter.addNotification("addressSelectedNotification", that.getAddress, that);
    
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    console.log("下拉刷新！");
    var that = this;
    
    that.setData({
      storeList: [],
    })
    that.reloadCurrent();
    wx.stopPullDownRefresh();
  },
  
  navigateToSearch:function(){
    wx.navigateTo({
      url: '../search/search'
    });
  },
  // 获取当前位置
  reloadCurrent: function () {
    var that = this;
    qqmapsdk = new QQMapWX({
      key: '74QBZ-EY2WS-BL3OS-6ERHY-GDSYT-5LFLC'
    });
    that.setData({
      address: '正在定位中...',
    });
    qqmapsdk.reverseGeocoder({
      poi_options: 'policy=2',
      get_poi: 1,
      success: function (res) {
        console.log(res);
        that.setData({
          address: res.result.formatted_addresses.recommend,
          result: res.result.pois,
          city: res.result.address_component.city,
          lat: res.result.location.lat,
          lng: res.result.location.lng
        });
        if (res.result.location){
          that.loadData(res.result.location.lat, res.result.location.lng);
          
        }
      }
    });
  },
  getAddress: function (data) {
    console.log(data);
    console.log("重新加载数据！！！")
    var that = this;
    that.setData({
      address: data.title,
      lat: data.location.lat,
      lng: data.location.lng
    });
    that.loadData(data.location.lat,data.location.lng);
    // console.log(that.data.lat + ',' + that.data.lng);
  },

  // 获取数据
  loadData: function (lat,lng) {
    //http://www.zjhaining.com/weixin_page/api.php?op=storelist&id=48,49&point=30.527760,120.692870
    var that = this;
    wx.request({
      url: 'https://www.zjhaining.com/weixin_page/api.php?op=storelist', 
      data: {
        point: lat + ',' + lng,
        id: '48,49'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.length) {
          var readyData = {};
          readyData.list = res.data
          that.setData({
            storeList: readyData
          })
        } else {
          that.setData({
            storeList: []
          })
        }

        app.globalData.discount = res.data
      }
      
    })
  },
  
  // 前往详情页
  toDetailPage:function(e){
    console.log(e);
    var id = e.currentTarget.dataset.idx;
    var that = this;
    wx.navigateTo({
      url: '../detail/detail?type=store&id=' + id
    });
  },
  // 前往搜索页
  toSearchStore: function () {
    var that = this;
    wx.navigateTo({
      url: '../search-store/search-store?lat=' + that.data.lat + '&lng=' + that.data.lng
    });
  },
  
  hiddenTap:function(){
    var that = this;
    that.setData({
      hidden: !that.data.hidden,
      isScroll: true
    })
  },
  swichNav:function(e){
    var that = this;
    that.setData({
      currentNavbar: e.currentTarget.dataset.idx
    });
  }

})
