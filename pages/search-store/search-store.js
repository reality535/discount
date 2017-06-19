// search-store.js
var app = getApp();
Page({
  data: {
    lat: 30.746129,
    lng:120.755486,
    searchList: [],
    hidden: true,
    discountModal: {},
    userInput: '',
    searchResult:true
  },
  onLoad: function (options) {
    this.setData({
      lat:options.lat,
      lng:options.lng
    })
  },
 
  onBindConfirm: function (event) {
    var text = event.detail.value;
    var that = this;
    that.setData({
      userInput: event.detail.value
    });
    that.searchData(that.data.lat, that.data.lng, text);

  },
  onBindFocus: function (event) {
    var that = this;
    that.setData({
      searchList: [],
      userInput: ''
    })
  },
  onCancelTap: function (event) {
    var that = this;
    that.setData({
      userInput: ''
    })

  },
  // toDetailTap: function (event) {
  //   console.log(event);
  //   var that = this;
  //   that.setData({
  //     hidden: !that.data.hidden
  //   })

  //   var detail_discount = event.currentTarget.dataset.discount;
  //   var detail_store = event.currentTarget.dataset.store;
  //   var detail_start = event.currentTarget.dataset.start;
  //   var detail_end = event.currentTarget.dataset.end;
  //   var discountModal = {
  //     detail_discount: detail_discount,
  //     detail_store: detail_store,
  //     detail_start: detail_start,
  //     detail_end: detail_end
  //   };
  //   that.setData({
  //     discountModal: discountModal
  //   })
  // },
  // 前往详情页
  toDetailPage: function (e) {
    console.log(e);
    var id = e.currentTarget.dataset.idx;
    var that = this;
    wx.navigateTo({
      url: '../detail/detail?type=search&id=' + id
    });
  },
  // 搜索数据
  searchData: function (lat, lng, s) {
    //http://www.zjhaining.com/weixin_page/api.php?op=storelist&id=48,49&point=30.527760,120.692870s=''
    var that = this;
    wx.request({
      url: 'https://www.zjhaining.com/weixin_page/api.php?op=storelist',
      data: {
        point: lat + ',' + lng,
        id: '48,49',
        s: s
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.length);
        if (res.data.length) {
          var readyData = {};
          readyData.list = res.data
          that.setData({
            searchList: readyData,
            searchResult:true
          })
          console.log(that.data.searchList);
        } else {
          that.setData({
            searchList: [],
            searchResult: false
          })
        }
        app.globalData.searchDiscount = res.data
      }
    })
  },
  hiddenTap: function () {
    var that = this;
    that.setData({
      hidden: !that.data.hidden
    })
  }
})