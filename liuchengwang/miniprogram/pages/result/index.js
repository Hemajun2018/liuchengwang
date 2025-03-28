const app = getApp();

Page({
  data: {
    projectId: '',
    projectInfo: null,
    loading: true
  },

  onLoad(options) {
    const { projectId } = options;
    
    if (!projectId) {
      wx.navigateBack();
      return;
    }
    
    this.setData({ projectId });
    this.loadProjectInfo();
  },
  
  // 加载项目信息
  loadProjectInfo() {
    this.setData({ loading: true });
    
    // 先尝试从本地获取
    const projectInfo = wx.getStorageSync('projectInfo');
    
    if (projectInfo && projectInfo.id === this.data.projectId) {
      console.log('从本地获取的项目信息:', projectInfo);
      
      // 确保数据格式正确
      const processedInfo = this.processProjectInfo(projectInfo);
      
      // 预先格式化时间和状态
      const formattedStartTime = this.formatDate(processedInfo.start_time);
      const formattedEndTime = this.formatDate(processedInfo.end_time);
      const statusText = this.getStatusText(processedInfo.status);
      
      console.log('预先格式化的开始时间:', formattedStartTime);
      console.log('预先格式化的结束时间:', formattedEndTime);
      console.log('预先格式化的状态文本:', statusText);
      
      this.setData({ 
        projectInfo: processedInfo,
        loading: false
      });
    } else {
      // 如果本地没有，则从服务器获取
      wx.request({
        url: `${app.globalData.baseUrl}/projects/${this.data.projectId}`,
        method: 'GET',
        success: (res) => {
          if (res.statusCode === 200) {
            const projectData = res.data;
            console.log('从服务器获取的项目信息:', projectData);
            
            // 确保数据格式正确
            const processedInfo = this.processProjectInfo(projectData);
            
            this.setData({ 
              projectInfo: processedInfo,
              loading: false
            });
          } else {
            wx.showToast({
              title: '获取项目信息失败',
              icon: 'none'
            });
            this.setData({ loading: false });
          }
        },
        fail: (err) => {
          console.error('请求项目信息失败:', err);
          wx.showToast({
            title: '网络请求失败',
            icon: 'none'
          });
          this.setData({ loading: false });
        }
      });
    }
  },
  
  // 格式化日期
  formatDate(date) {
    console.log('格式化日期调用:', date, typeof date);
    if (!date) {
      console.log('日期为空，返回未设置');
      return '未设置';
    }
    
    // 如果已经是格式化的日期字符串（如YYYY-MM-DD），直接返回
    if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
      console.log('日期已是正确格式，直接返回:', date);
      return date;
    }
    
    try {
      // 确保date是Date对象
      const dateObj = date instanceof Date ? date : new Date(date);
      console.log('转换为Date对象:', dateObj);
      
      // 检查日期是否有效
      if (isNaN(dateObj.getTime())) {
        console.error('无效的日期:', date);
        return '日期格式错误';
      }
      
      // 格式化为YYYY-MM-DD
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      
      const formattedDate = `${year}-${month}-${day}`;
      console.log('格式化后的日期:', formattedDate);
      return formattedDate;
    } catch (error) {
      console.error('日期格式化错误:', error);
      return '日期格式错误';
    }
  },
  
  // 获取状态文本
  getStatusText(status) {
    console.log('获取状态文本调用:', status, typeof status);
    
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
      'delayed': '已延期'
    };
    
    const result = statusMap[status] || '未知状态';
    console.log('状态文本结果:', result);
    return result;
  },
  
  // 返回流程图
  goBack() {
    wx.navigateBack();
  },
  
  // 处理项目信息，确保格式正确
  processProjectInfo(info) {
    // 创建一个新对象，避免修改原始对象
    const processedInfo = {...info};
    
    // 确保日期字段存在且格式正确
    if (processedInfo.start_time) {
      // 不需要转换为Date对象，直接使用字符串
      console.log('处理后的开始时间:', processedInfo.start_time);
    }
    
    if (processedInfo.end_time) {
      // 不需要转换为Date对象，直接使用字符串
      console.log('处理后的结束时间:', processedInfo.end_time);
    }
    
    // 确保状态是数字
    if (processedInfo.status !== undefined) {
      processedInfo.status = Number(processedInfo.status);
      console.log('处理后的状态:', processedInfo.status);
    }
    
    return processedInfo;
  }
}); 