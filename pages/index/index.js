// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
     "listImages":[],
  },
  // 事件处理函数
  onLoad() {
     this.getBanner();
  },
  getBanner(){
    let that = this;
    app.wxRequest('public_setting',{force:'rotation_image'},function(res){
        that.setData({
          'listImages':res.data.data
        });
    });
  },

})
