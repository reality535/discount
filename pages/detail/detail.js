var WxNotificationCenter = require('../../utils/WxNotificationCenter.js');
var app = getApp();
Page({
  data:{
    storeDiscount:{},
    disCountList:[],
    hide:true,
    currentIdx:0,
    stateArr:[]
  },
  onLoad:function(options){
    console.log(options.type);
    var that = this;
    var id = options.id;
    if (options.type=='store'){
      var discount = app.globalData.discount;
    } else if (options.type == 'search'){
      var discount = app.globalData.searchDiscount;
    }
    var disLength = discount[id].discount.length;
    var stateArr = new Array(disLength).fill(false);


    if (discount[id]){
      that.setData({
        storeDiscount: discount[id],
        stateArr: stateArr
      })
    }

    
  },
  upDownTap:function(e){
    console.log(e);
    var itemIdx = e.currentTarget.dataset.itemidx;
    console.log(itemIdx);
   
    var that = this;
    that.data.stateArr[itemIdx] = !that.data.stateArr[itemIdx];
    console.log(that.data.stateArr);
    that.setData({
      hide:!that.data.hide,
      currentIdx: itemIdx,
      stateArr: that.data.stateArr
    })
  },
  //  导航
  toMapTap:function(e){
    
    var address = e.currentTarget.dataset.address;
    var addressArr = address.split("|");
    var title = e.currentTarget.dataset.title;
    console.log(addressArr);
    var latitude = parseFloat(addressArr[0]);
    var longitude = parseFloat(addressArr[1]);
    wx.openLocation({
      name:title,
      latitude: latitude,
      longitude: longitude,
      scale: 14
    })
  }


})