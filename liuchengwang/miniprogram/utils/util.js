// 通用工具函数

/**
 * 格式化时间
 * @param {Date} date - 日期对象
 * @returns {string} 格式化后的时间字符串
 */
const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  return `${year}-${padZero(month)}-${padZero(day)}`;
};

/**
 * 数字补零
 * @param {number} n - 数字
 * @returns {string} 补零后的字符串
 */
const padZero = n => {
  return n < 10 ? '0' + n : '' + n;
};

/**
 * 计算预计完成日期
 * @param {string} startDate - 开始日期
 * @param {number} daysNeeded - 需要天数
 * @returns {string} 预计完成日期
 */
const calculateExpectedEndDate = (startDate, daysNeeded) => {
  const date = new Date(startDate);
  date.setDate(date.getDate() + daysNeeded);
  return formatTime(date);
};

/**
 * 显示提示信息
 * @param {string} title - 提示内容
 * @param {string} icon - 图标类型
 */
const showToast = (title, icon = 'none') => {
  wx.showToast({
    title,
    icon,
    duration: 2000
  });
};

// 导出模块
module.exports = {
  formatTime,
  padZero,
  calculateExpectedEndDate,
  showToast
};