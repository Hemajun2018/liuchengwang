// 流程图组件
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 前置条件
    precondition: {
      type: Object,
      value: {}
    },
    // 问题列表
    problems: {
      type: Array,
      value: []
    },
    // 材料列表
    materials: {
      type: Array,
      value: []
    },
    // 节点列表
    nodes: {
      type: Array,
      value: []
    },
    // 成果
    result: {
      type: Object,
      value: {}
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
    /**
     * 元素点击事件
     */
    onElementTap(e) {
      const { type, id } = e.currentTarget.dataset;
      
      // 触发元素点击事件
      this.triggerEvent('elementtap', { type, id });
      
      // 根据元素类型跳转到不同页面
      let url = '';
      switch (type) {
        case 'precondition':
          url = `/pages/precondition/precondition?id=${id}`;
          break;
        case 'problem':
          url = `/pages/problem/problem?id=${id}`;
          break;
        case 'material':
          url = `/pages/material/material?id=${id}`;
          break;
        case 'node':
          url = `/pages/node/node?id=${id}`;
          break;
        case 'result':
          url = `/pages/result/result?id=${id}`;
          break;
      }
      
      if (url) {
        wx.navigateTo({ url });
      }
    }
  }
})