// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    timeId:'',
    // 刚开始使用对象数组方式渲染到页面，因为每次切换图片都会重新加载都会抖动
    // 所以采用提前渲染都是不展示的方式。
    // imageobjs: [{posit:'49.8% 89.2%',size:'43.5% 42%',imgId:'2-4-x'},
    // {posit:'38% 89%',size:'54% 42%',imgId:'5-7-x'},
    // {posit:'37.8% 89%',size:'54.4% 42%',imgId:'7-9-x'},
    // {posit:'30% 89%',size:'71.2% 43.5%',imgId:'9-12-x'}],
    // 展示哪张图片的标识
    isShowArr:[1,2,3,4],
    isShow:0,
    // 间隔时间，对应长按1s,2s,5s,7s,10s
    timeIds:[1,1,3,2,3],
    isDoudong: false, //控制图片抖动
  },

 //touch start
handleTouchStart: function(e) {  
  // 浅拷贝 复制了引用 可以同时改变数组
  var _this = this.data;
  var i = 0; 
  var j = 0;
  var timem = 0
  this.data.timeId = setInterval(()=>{
    // 当第4张图片循环完了之后重置为第1张
    if(i===4){
      j=0;
    }
    // 第一遍循环完之后就开始间隔 1 3 2 3秒的循环
    if(i===5){
      i=1;
    }
  this.setData({
    isShow:_this.isShowArr[j]
    },()=>{
      console.log('koioh');
    })
 
    // 长按的时间
    timem += _this.timeIds[i];
    console.log('time:'+timem,'iS:'+_this.isShowArr[j],'i:'+i);

    i++;
    j++;
  },_this.timeIds[i]*1000)
}, 

//touch end
handleTouchEnd: function(e) {   
  clearInterval(this.data.timeId)
  this.setData({
    changeImg: this.data.changeImg
    })
    console.log('离开了',e);
  // this.endTime = e.timeStamp;   
  // console.log(" endTime = " + e.timeStamp); 
}, 

  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
   var that = this
    //抖动相关的
    setInterval(function() {
      let isDoudong = that.data.isDoudong
      that.setData({
        isDoudong: !isDoudong
      })
    }, 1000)
  },
})