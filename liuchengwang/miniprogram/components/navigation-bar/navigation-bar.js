Component({
  properties: {
    title: {
      type: String,
      value: ''
    },
    back: {
      type: Boolean,
      value: false
    },
    color: {
      type: String,
      value: '#000000'
    },
    background: {
      type: String,
      value: '#ffffff'
    }
  },
  
  data: {
    statusBarHeight: 20,
    navBarHeight: 64
  },
  
  lifetimes: {
    attached() {
      try {
        // 使用新的API获取窗口信息
        const windowInfo = wx.getWindowInfo();
        
        this.setData({
          statusBarHeight: windowInfo.statusBarHeight || 20,
          navBarHeight: (windowInfo.statusBarHeight || 20) + 44
        });
      } catch (error) {
        console.error('获取窗口信息失败:', error);
        // 使用默认值
        this.setData({
          statusBarHeight: 20,
          navBarHeight: 64
        });
      }
    }
  },
  
  methods: {
    navigateBack() {
      wx.navigateBack({
        delta: 1
      });
    }
  }
})
