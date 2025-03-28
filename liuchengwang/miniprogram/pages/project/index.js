const app = getApp();

Page({
  data: {
    projectId: '',
    projectInfo: null,
    nodes: [],
    loading: true,
    hasPrerequisite: false,
    hasResult: false
  },

  onLoad(options) {
    console.log('项目页面加载, options:', options);
    const { projectId } = options;
    
    if (!projectId) {
      console.log('缺少项目ID, 重定向到登录页面');
      wx.showToast({
        title: '缺少项目ID',
        icon: 'none'
      });
      wx.redirectTo({
        url: '/pages/index/index'
      });
      return;
    }
    
    console.log('设置项目ID:', projectId);
    this.setData({ projectId });
    this.loadProjectInfo();
  },
  
  onShow() {
    console.log('项目页面显示');
    // 每次显示页面时重新加载节点列表
    if (this.data.projectId) {
      this.loadNodeList();
    }
  },
  
  loadProjectInfo() {
    console.log('加载项目信息');
    // 先尝试从本地获取
    const projectInfo = wx.getStorageSync('projectInfo');
    
    if (projectInfo && projectInfo.id === this.data.projectId) {
      console.log('从本地获取项目信息:', projectInfo);
      this.setData({ 
        projectInfo,
        hasPrerequisite: !!projectInfo.deliverables,
        hasResult: !!(projectInfo.results && projectInfo.results.length > 0)
      });
      
      // 加载节点列表
      this.loadNodeList();
    } else {
      console.log('从服务器获取项目信息');
      // 如果本地没有，则从服务器获取
      wx.request({
        url: `${app.globalData.baseUrl}/projects/${this.data.projectId}`,
        method: 'GET',
        success: (res) => {
          console.log('获取项目信息成功:', res.data);
          if (res.statusCode === 200) {
            const projectInfo = res.data;
            
            // 保存到本地
            wx.setStorageSync('projectInfo', projectInfo);
            
            this.setData({ 
              projectInfo,
              hasPrerequisite: !!projectInfo.deliverables,
              hasResult: !!(projectInfo.results && projectInfo.results.length > 0)
            });
            
            // 加载节点列表
            this.loadNodeList();
          } else {
            console.log('获取项目信息失败:', res);
            wx.showToast({
              title: '获取项目信息失败',
              icon: 'none'
            });
            setTimeout(() => {
              wx.redirectTo({
                url: '/pages/index/index'
              });
            }, 1500);
          }
        },
        fail: (err) => {
          console.error('请求项目信息失败:', err);
          wx.showToast({
            title: '网络请求失败',
            icon: 'none'
          });
        }
      });
    }
  },
  
  loadNodeList() {
    console.log('加载节点列表');
    this.setData({ loading: true });
    
    wx.request({
      url: `${app.globalData.baseUrl}/projects/${this.data.projectId}/nodes`,
      method: 'GET',
      success: (res) => {
        console.log('获取节点列表成功:', res.data);
        if (res.statusCode === 200) {
          this.setData({ 
            nodes: res.data,
            loading: false
          });
        } else {
          console.log('获取节点列表失败:', res);
          this.setData({ loading: false });
          wx.showToast({
            title: '获取节点列表失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        console.error('请求节点列表失败:', err);
        this.setData({ loading: false });
        wx.showToast({
          title: '网络请求失败',
          icon: 'none'
        });
      }
    });
  },
  
  // 格式化日期
  formatDate(date) {
    if (!date) return '';
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('zh-CN');
  },
  
  // 获取项目状态文本
  getProjectStatusText(status) {
    console.log('获取项目状态文本, status:', status);
    const statusMap = {
      0: '未开始',
      1: '进行中',
      2: '已完成',
      3: '已延期'
    };
    return statusMap[status] || '未知状态';
  },
  
  // 获取节点状态文本
  getNodeStatusText(status) {
    console.log('获取节点状态文本, status:', status);
    const statusMap = {
      'not_started': '未开始',
      'in_progress': '进行中',
      'completed': '已完成',
      'delayed': '已延期',
      'blocked': '已阻塞'
    };
    return statusMap[status] || '未知状态';
  },
  
  // 获取节点状态样式类
  getNodeStatusClass(status) {
    console.log('获取节点状态样式类, status:', status);
    const statusClassMap = {
      'not_started': '',
      'in_progress': 'in-progress',
      'completed': 'completed',
      'delayed': 'delayed'
    };
    return statusClassMap[status] || '';
  },
  
  // 跳转到前置条件详情页
  goToPrerequisiteDetail() {
    console.log('跳转到前置条件详情页');
    wx.navigateTo({
      url: `/pages/prerequisite/detail?projectId=${this.data.projectId}`
    });
  },
  
  // 跳转到节点详情页
  goToNodeDetail(e) {
    const nodeId = e.currentTarget.dataset.id;
    const type = e.currentTarget.dataset.type || 'node';
    console.log('跳转到节点详情页, nodeId:', nodeId, 'type:', type);
    
    // 根据类型跳转到不同的页面
    if (type === 'issue') {
      // 跳转到问题详情页
      wx.navigateTo({
        url: `/pages/problem/detail?nodeId=${nodeId}&projectId=${this.data.projectId}`
      });
    } else if (type === 'material') {
      // 跳转到材料详情页
      wx.navigateTo({
        url: `/pages/material/detail?nodeId=${nodeId}&projectId=${this.data.projectId}`
      });
    } else {
      // 跳转到节点详情页（包含交付内容）
      wx.navigateTo({
        url: `/pages/node/detail?nodeId=${nodeId}&projectId=${this.data.projectId}`
      });
    }
  },
  
  // 跳转到成果详情页
  goToResultDetail() {
    console.log('跳转到成果详情页');
    wx.navigateTo({
      url: `/pages/result/index?projectId=${this.data.projectId}`
    });
  },
  
  // 退出登录
  logout() {
    console.log('退出登录');
    wx.showModal({
      title: '确认退出',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 清除本地存储的项目信息
          wx.removeStorageSync('projectInfo');
          
          // 跳转到登录页面
          wx.redirectTo({
            url: '/pages/index/index'
          });
        }
      }
    });
  }
}); 