var WxNotificationCenter = require('../../utils/WxNotificationCenter.js');
var app = getApp();
Page({
  data:{
    storeDiscount:{},
    dis:"",
    disCountList:[]
  },
  onLoad:function(){
    var that = this;
    var discount = app.globalData.discount;
    var dis = app.globalData.dis;

    if (discount){
      that.setData({
        storeDiscount: discount
      })
    }
    var arr = [];
    if (dis){
      for (var i = 0; i < dis.length; i++) {
        var item = dis[i];
        // console.log(item);
        // console.log(discount[item]);
        arr.push(discount[item]);
      }
      that.setData({
        disCountList:arr
      })
    }
    
  }
  // onShow: function () {
  //   var arr = getCurrentPages();
  //   console.log(arr);
  //   arr[0].test("雨天");
  // }

})