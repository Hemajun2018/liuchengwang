// 项目状态管理
const { observable, action } = require('mobx-miniprogram');

module.exports = observable({
  // 状态
  elements: null,
  relations: null,
  
  // 分类元素
  get precondition() {
    if (!this.elements) return null;
    return this.elements.find(item => item.type_id === 1) || null;
  },
  
  get problems() {
    if (!this.elements) return [];
    return this.elements.filter(item => item.type_id === 2) || [];
  },
  
  get materials() {
    if (!this.elements) return [];
    return this.elements.filter(item => item.type_id === 3) || [];
  },
  
  get nodes() {
    if (!this.elements) return [];
    return this.elements.filter(item => item.type_id === 4) || [];
  },
  
  get result() {
    if (!this.elements) return null;
    return this.elements.find(item => item.type_id === 5) || null;
  },
  
  // 动作
  setElements: action(function(elements) {
    this.elements = elements;
    
    // 保存到全局状态
    getApp().globalData.elements = elements;
  }),
  
  setRelations: action(function(relations) {
    this.relations = relations;
    
    // 保存到全局状态
    getApp().globalData.relations = relations;
  }),
  
  clear: action(function() {
    this.elements = null;
    this.relations = null;
  })
});