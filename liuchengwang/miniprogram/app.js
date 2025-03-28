// app.js
App({
  onLaunch() {
    // 启动时的初始化逻辑
    console.log('小程序启动');
    
    // 检查是否有缓存的项目信息
    const projectInfo = wx.getStorageSync('projectInfo');
    if (projectInfo) {
      this.globalData.projectInfo = projectInfo;
    }
  },
  
  globalData: {
    // API基础地址，开发环境使用本地地址
    // 由于在微信开发者工具中已勾选"不校验合法域名"，可以直接使用http
    baseUrl: 'http://localhost:3000/api',
    
    // 用户和项目信息
    projectInfo: null
  }
});
