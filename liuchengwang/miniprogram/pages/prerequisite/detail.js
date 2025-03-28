const app = getApp();

Page({
  data: {
    projectId: '',
    prerequisiteId: '',
    projectName: '',
    deliverables: [],
    loading: true
  },

  onLoad(options) {
    const { projectId, prerequisiteId } = options;
    
    if (!projectId) {
      wx.showToast({
        title: '参数错误',
        icon: 'none'
      });
      wx.navigateBack();
      return;
    }
    
    this.setData({ 
      projectId,
      prerequisiteId: prerequisiteId || ''
    });
    
    // 加载项目信息
    this.loadProjectInfo();
    
    // 加载前置条件交付内容
    this.loadPrerequisiteDeliverables();
  },
  
  onShow() {
    // 每次显示页面时重新加载数据
    if (this.data.projectId) {
      this.loadPrerequisiteDeliverables();
    }
  },
  
  // 加载项目信息
  loadProjectInfo() {
    const projectInfo = wx.getStorageSync('projectInfo');
    
    if (projectInfo && projectInfo.id === this.data.projectId) {
      this.setData({ 
        projectName: projectInfo.name
      });
    } else {
      wx.request({
        url: `${app.globalData.baseUrl}/projects/${this.data.projectId}`,
        method: 'GET',
        success: (res) => {
          if (res.statusCode === 200) {
            this.setData({ 
              projectName: res.data.name
            });
            
            // 缓存项目信息
            wx.setStorageSync('projectInfo', res.data);
          }
        }
      });
    }
  },
  
  // 加载前置条件交付内容
  loadPrerequisiteDeliverables() {
    this.setData({ loading: true });
    
    wx.request({
      url: `${app.globalData.baseUrl}/prerequisites/project/${this.data.projectId}`,
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200) {
          const prerequisites = res.data || [];
          
          // 处理交付内容数据
          const processedDeliverables = prerequisites.map(item => {
            return {
              id: item.id,
              content: item.content,
              startDate: this.formatDate(item.start_date),
              endDate: this.formatDate(item.expected_end_date),
              durationDays: item.duration_days || 0,
              status: item.status,
              statusText: this.getStatusText(item.status)
            };
          });
          
          this.setData({
            deliverables: processedDeliverables,
            loading: false
          });
        } else {
          wx.showToast({
            title: '获取前置条件失败',
            icon: 'none'
          });
          this.setData({ loading: false });
        }
      },
      fail: (err) => {
        console.error('请求前置条件失败:', err);
        wx.showToast({
          title: '网络请求失败',
          icon: 'none'
        });
        this.setData({ loading: false });
      }
    });
  },
  
  // 格式化日期
  formatDate(date) {
    if (!date) return '未设置';
    const dateObj = new Date(date);
    return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
  },
  
  // 获取状态文本
  getStatusText(status) {
    const statusMap = {
      'not_started': '未开始',
      'in_progress': '进行中',
      'completed': '已完成',
      'delayed': '已延期',
      'pending': '待处理'
    };
    return statusMap[status] || '未知状态';
  },
  
  // 返回上一页
  goBack() {
    wx.navigateBack();
  }
}); 