// 材料详情页面逻辑
const { request } = require('../../utils/request');
const { isLoggedIn } = require('../../utils/auth');

Page({
  data: {
    projectInfo: null,
    element: null,
    loading: true,
    errorMessage: ''
  },

  onLoad(options) {
    console.log('材料详情页 onLoad:', options);
    
    // 检查是否已登录
    if (!isLoggedIn()) {
      console.log('未登录，跳转到登录页');
      wx.redirectTo({
        url: '/pages/index/index'
      });
      return;
    }
    
    // 获取项目信息
    const projectInfo = getApp().globalData.projectInfo;
    console.log('获取到项目信息:', projectInfo);
    
    if (!projectInfo) {
      this.setData({
        loading: false,
        errorMessage: '未获取到项目信息'
      });
      return;
    }
    
    this.setData({ projectInfo });
    
    // 获取元素ID
    const id = options.id;
    console.log('获取到元素ID:', id);
    
    if (!id) {
      this.setData({
        loading: false,
        errorMessage: '未获取到材料ID'
      });
      return;
    }
    
    // 加载元素详情
    this.loadElementDetail(id);
  },
  
  // 加载元素详情
  loadElementDetail(id) {
    console.log('开始加载元素详情:', id);
    this.setData({ loading: true, errorMessage: '' });
    
    // 从全局状态获取元素
    const elements = getApp().globalData.elements || [];
    console.log('全局状态中的元素列表:', elements);
    
    if (!elements || elements.length === 0) {
      this.setData({
        loading: false,
        errorMessage: '未找到元素数据'
      });
      return;
    }
    
    const element = elements.find(item => item.id == id);
    
    if (element) {
      console.log('从全局状态找到元素:', element);
      this.setData({
        element,
        loading: false
      });
    } else {
      console.log('全局状态中未找到元素，从API获取');
      // 如果全局状态中没有，则从API获取
      request({
        url: `/api/elements/${id}`,
        method: 'GET'
      })
        .then(res => {
          console.log('API返回元素数据:', res.data);
          const element = res.data;
          
          if (!element) {
            this.setData({
              loading: false,
              errorMessage: '未获取到材料数据'
            });
            return;
          }
          
          this.setData({
            element,
            loading: false
          });
        })
        .catch(err => {
          console.error('加载元素详情失败:', err);
          this.setData({
            loading: false,
            errorMessage: err.message || '加载详情失败'
          });
        });
    }
  },
  
  // 返回上一页
  onBack() {
    wx.navigateBack();
  }
});