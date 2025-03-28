// index.js
const app = getApp();

Page({
  data: {
    projectId: '',
    password: '',
    loading: false
  },

  // 生命周期函数
  onLoad() {
    console.log('登录页面加载');
    console.log('API地址:', app.globalData.baseUrl);
    
    // 检查是否有缓存的登录信息
    const projectInfo = wx.getStorageSync('projectInfo');
    if (projectInfo && projectInfo.id) {
      // 如果有缓存的项目信息，直接跳转到项目页面
      wx.redirectTo({
        url: `/pages/project/index?projectId=${projectInfo.id}`
      });
    }
  },
  
  onShow() {
    // 检查网络连接
    wx.getNetworkType({
      success: (res) => {
        console.log('当前网络类型:', res.networkType);
      }
    });
  },

  // 项目ID输入事件
  onProjectIdInput(e) {
    this.setData({
      projectId: e.detail.value
    });
  },

  // 密码输入事件
  onPasswordInput(e) {
    this.setData({
      password: e.detail.value
    });
  },

  // 处理登录
  handleLogin() {
    const { projectId, password } = this.data;
    
    // 验证输入
    if (!projectId.trim()) {
      wx.showToast({
        title: '请输入项目ID',
        icon: 'none'
      });
      return;
    }
    
    if (!password.trim()) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      });
      return;
    }
    
    this.setData({ loading: true });
    
    // 发送登录请求
    wx.request({
      url: `${app.globalData.baseUrl}/projects/verify`,
      method: 'POST',
      data: {
        name: projectId,
        password: password
      },
      success: (res) => {
        console.log('登录响应数据:', res.data);
        
        if (res.statusCode === 200 || res.statusCode === 201) {
          // 登录成功，保存项目信息
          wx.setStorageSync('projectInfo', res.data);
          
          // 跳转到项目页面
          wx.redirectTo({
            url: `/pages/project/index?projectId=${res.data.id}`
          });
        } else {
          // 登录失败
          wx.showToast({
            title: res.data.message || '登录失败，请检查项目ID和密码',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        console.error('登录请求失败:', err);
        wx.showToast({
          title: '网络请求失败',
          icon: 'none'
        });
      },
      complete: () => {
        console.log('登录请求完成');
        this.setData({ loading: false });
      }
    });
  }
});
