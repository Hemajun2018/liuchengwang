// 网络请求封装
const BASE_URL = 'http://localhost:3000'; // 开发环境API地址，生产环境需要修改
const MOCK_MODE = true; // 是否使用模拟数据模式

// 模拟数据
const mockData = {
  // 项目验证
  '/api/auth/project/verify': {
    id: 1,
    name: '示例项目',
    password: '123456',
    start_date: '2023-01-01',
    days_needed: 30,
    expected_end: '2023-01-31',
    status: 'pending'
  },
  
  // 项目元素
  '/api/projects/1/elements': [
    {
      id: 1,
      project_id: 1,
      type_id: 1, // 前置条件
      name: '前置条件',
      content: '交付内容1\n交付内容2\n交付内容3',
      date_content: '2023年1月1日开始',
      order: 1,
      status: 'completed'
    },
    {
      id: 2,
      project_id: 1,
      type_id: 2, // 问题
      name: '问题1',
      content: '这是问题1的内容描述',
      date_content: '2023年1月5日处理',
      order: 2,
      status: 'completed'
    },
    {
      id: 3,
      project_id: 1,
      type_id: 2, // 问题
      name: '问题2',
      content: '这是问题2的内容描述',
      date_content: '2023年1月10日处理',
      order: 3,
      status: 'pending'
    },
    {
      id: 4,
      project_id: 1,
      type_id: 3, // 材料
      name: '材料1',
      content: '这是材料1的内容描述',
      date_content: '2023年1月15日准备',
      order: 4,
      status: 'completed'
    },
    {
      id: 5,
      project_id: 1,
      type_id: 3, // 材料
      name: '材料2',
      content: '这是材料2的内容描述',
      date_content: '2023年1月20日准备',
      order: 5,
      status: 'pending'
    },
    {
      id: 6,
      project_id: 1,
      type_id: 4, // 节点
      name: '开始节点',
      content: '项目启动',
      date_content: '2023年1月1日',
      order: 6,
      status: 'completed'
    },
    {
      id: 7,
      project_id: 1,
      type_id: 4, // 节点
      name: '中间节点',
      content: '项目进行中',
      date_content: '2023年1月15日',
      order: 7,
      status: 'completed'
    },
    {
      id: 8,
      project_id: 1,
      type_id: 4, // 节点
      name: '结束节点',
      content: '项目结束',
      date_content: '2023年1月30日',
      order: 8,
      status: 'pending'
    },
    {
      id: 9,
      project_id: 1,
      type_id: 5, // 成果
      name: '项目成果',
      content: '项目最终交付物',
      date_content: '2023年1月31日',
      order: 9,
      status: 'pending'
    }
  ],
  
  // 项目关系
  '/api/projects/1/relations': [
    { id: 1, source_id: 1, target_id: 2, project_id: 1 },
    { id: 2, source_id: 1, target_id: 3, project_id: 1 },
    { id: 3, source_id: 2, target_id: 4, project_id: 1 },
    { id: 4, source_id: 3, target_id: 5, project_id: 1 },
    { id: 5, source_id: 4, target_id: 6, project_id: 1 },
    { id: 6, source_id: 5, target_id: 7, project_id: 1 },
    { id: 7, source_id: 6, target_id: 8, project_id: 1 },
    { id: 8, source_id: 7, target_id: 9, project_id: 1 },
    { id: 9, source_id: 8, target_id: 9, project_id: 1 }
  ],
  
  // 元素文件
  '/api/elements/9/files': [
    {
      id: 1,
      element_id: 9,
      name: '项目报告.docx',
      path: '/uploads/report.docx',
      size: 1024 * 1024 * 2.5, // 2.5MB
      type: 'docx'
    },
    {
      id: 2,
      element_id: 9,
      name: '项目演示.pptx',
      path: '/uploads/presentation.pptx',
      size: 1024 * 1024 * 5.8, // 5.8MB
      type: 'pptx'
    }
  ]
};

// 模拟请求处理
const mockRequest = (options) => {
  return new Promise((resolve, reject) => {
    console.log('模拟请求:', options.url);
    
    // 延迟模拟网络请求
    setTimeout(() => {
      // 处理不同的请求路径
      let responseData = null;
      
      // 处理动态路径
      if (options.url.match(/\/api\/elements\/\d+$/)) {
        // 获取元素详情
        const elementId = parseInt(options.url.split('/').pop());
        const allElements = mockData['/api/projects/1/elements'];
        responseData = allElements.find(item => item.id === elementId);
      } else if (options.url.match(/\/api\/elements\/\d+\/files$/)) {
        // 获取元素文件
        const elementId = parseInt(options.url.split('/')[3]);
        const mockPath = `/api/elements/${elementId}/files`;
        responseData = mockData[mockPath] || [];
      } else {
        // 处理静态路径
        responseData = mockData[options.url];
      }
      
      if (responseData) {
        resolve({
          data: responseData,
          statusCode: 200,
          header: {}
        });
      } else {
        reject({
          message: '未找到模拟数据',
          statusCode: 404
        });
      }
    }, 500); // 延迟500ms
  });
};

/**
 * 封装wx.request为Promise
 * @param {Object} options - 请求选项
 * @param {string} options.url - 请求地址
 * @param {string} options.method - 请求方法
 * @param {Object} options.data - 请求数据
 * @param {Object} options.header - 请求头
 * @returns {Promise} Promise对象
 */
const request = (options) => {
  // 如果是模拟模式，使用模拟数据
  if (MOCK_MODE) {
    return mockRequest(options);
  }
  
  return new Promise((resolve, reject) => {
    // 获取存储的token
    const token = wx.getStorageSync('token') || '';
    
    // 合并请求头
    const header = Object.assign(
      {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      },
      options.header || {}
    );
    
    // 发起请求
    wx.request({
      url: `${BASE_URL}${options.url}`,
      method: options.method || 'GET',
      data: options.data,
      header: header,
      success: (res) => {
        // 请求成功，但业务状态可能失败
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
        } else if (res.statusCode === 401) {
          // 未授权，清除token
          wx.removeStorageSync('token');
          reject({ message: '登录已过期，请重新登录' });
          
          // 跳转到登录页
          wx.navigateTo({
            url: '/pages/index/index'
          });
        } else {
          // 其他错误
          reject({
            statusCode: res.statusCode,
            message: res.data.message || '请求失败'
          });
        }
      },
      fail: (err) => {
        // 请求失败
        reject({
          message: '网络请求失败，请检查网络连接'
        });
      }
    });
  });
};

// 导出模块
module.exports = {
  request,
  BASE_URL
};