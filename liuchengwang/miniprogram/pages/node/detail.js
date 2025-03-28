const app = getApp();

Page({
  data: {
    projectId: '',
    nodeId: '',
    projectName: '',
    nodeName: '',
    nodeStatus: 'not_started',
    nodeStatusText: '未开始',
    deliverables: [],
    loading: true
  },

  onLoad(options) {
    const { nodeId, projectId } = options;
    
    if (!nodeId || !projectId) {
      wx.showToast({
        title: '参数错误',
        icon: 'none'
      });
      wx.navigateBack();
      return;
    }
    
    this.setData({ 
      nodeId,
      projectId
    });
    
    this.loadNodeDetail();
  },
  
  onShow() {
    // 每次显示页面时重新加载数据
    if (this.data.nodeId) {
      this.loadNodeDetail();
    }
  },
  
  // 加载节点详情
  loadNodeDetail() {
    this.setData({ loading: true });
    
    // 先获取项目信息以获取项目名称
    wx.request({
      url: `${app.globalData.baseUrl}/projects/${this.data.projectId}`,
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200) {
          const projectInfo = res.data;
          this.setData({
            projectName: projectInfo.name || '未知项目'
          });
        }
      },
      complete: () => {
        // 获取节点详情
        wx.request({
          url: `${app.globalData.baseUrl}/projects/${this.data.projectId}/nodes/${this.data.nodeId}`,
          method: 'GET',
          success: (res) => {
            if (res.statusCode === 200) {
              const nodeInfo = res.data;
              console.log('获取到的节点信息:', JSON.stringify(nodeInfo, null, 2));
              
              // 获取状态文本
              const statusText = this.getStatusText(nodeInfo.status);
              
              this.setData({
                nodeName: nodeInfo.name || '',
                nodeStatus: nodeInfo.status || 'not_started',
                nodeStatusText: statusText,
                loading: false
              });
              
              // 获取节点的交付内容
              wx.request({
                url: `${app.globalData.baseUrl}/projects/${this.data.projectId}/nodes/${this.data.nodeId}/deliverables`,
                method: 'GET',
                success: (res) => {
                  if (res.statusCode === 200) {
                    const deliverables = res.data;
                    console.log('获取到的交付内容:', JSON.stringify(deliverables, null, 2));
                    
                    // 处理交付内容数据
                    const processedDeliverables = deliverables.map(deliverable => ({
                      ...deliverable,
                      formattedStartDate: this.formatDate(deliverable.start_date),
                      formattedEndDate: this.formatDate(deliverable.expected_end_date),
                      statusText: this.getStatusText(deliverable.status)
                    }));
                    
                    this.setData({
                      deliverables: processedDeliverables
                    });
                  } else {
                    console.error('获取交付内容失败:', res);
                    wx.showToast({
                      title: '获取交付内容失败',
                      icon: 'none'
                    });
                  }
                },
                fail: (err) => {
                  console.error('请求交付内容失败:', err);
                  wx.showToast({
                    title: '网络请求失败',
                    icon: 'none'
                  });
                }
              });
            } else {
              wx.showToast({
                title: '获取节点详情失败',
                icon: 'none'
              });
              this.setData({ loading: false });
            }
          },
          fail: (err) => {
            console.error('请求节点详情失败:', err);
            wx.showToast({
              title: '网络请求失败',
              icon: 'none'
            });
            this.setData({ loading: false });
          }
        });
      }
    });
  },
  
  // 格式化日期
  formatDate(date) {
    if (!date) {
      return '';
    }
    
    try {
      // 确保date是Date对象
      const dateObj = date instanceof Date ? date : new Date(date);
      
      // 检查日期是否有效
      if (isNaN(dateObj.getTime())) {
        return '';
      }
      
      // 格式化为YYYY-MM-DD
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error('日期格式化错误:', error);
      return '';
    }
  },
  
  // 获取状态文本
  getStatusText(status) {
    // 如果状态是数字，转换为对应的状态码
    if (typeof status === 'number') {
      const numericStatusMap = {
        0: 'not_started',
        1: 'in_progress',
        2: 'completed',
        3: 'delayed'
      };
      status = numericStatusMap[status] || status;
    }
    
    const statusMap = {
      'not_started': '未开始',
      'in_progress': '进行中',
      'completed': '已完成',
      'delayed': '已延期',
      'blocked': '已阻塞',
      'pending': '待处理',
      'resolved': '已解决'
    };
    
    return statusMap[status] || '未知状态';
  },
  
  // 返回流程图
  goBack() {
    wx.navigateBack();
  }
}); 