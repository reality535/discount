//app.js
App({
  onLaunch: function () {
    this.convertDis(96);
  },

  // 距离换算
  convertDis:function(distance){ 
    if(distance<1000){
      distance = distance + 'm'
    }else if(distance>1000){
      distance = ((Math.round(distance / 100) / 10).toFixed(1) + "km");
    }
    return distance;
  },
  
  globalData:{
    discount:null,
    dis:null
  }
})