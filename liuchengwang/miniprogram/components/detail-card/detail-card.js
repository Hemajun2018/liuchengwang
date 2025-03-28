// 详情卡片组件
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 标题
    title: {
      type: String,
      value: ''
    },
    // 状态
    status: {
      type: String,
      value: 'pending' // pending, completed
    },
    // 开始时间
    startDate: {
      type: String,
      value: ''
    },
    // 需要天数
    daysNeeded: {
      type: Number,
      value: 0
    },
    // 预计完成日期
    expectedEnd: {
      type: String,
      value: ''
    },
    // 是否显示底部
    showFooter: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})