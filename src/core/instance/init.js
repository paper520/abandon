import isFunction from '@yelloxing/core.js/isFunction';

let uid = 1;

export function initMixin(Abandon) {

  // 对象初始化
  Abandon.prototype._init = function (options) {

    this.$uid = uid++;
    options = options || {};

    for (let key in options) {
      // 判断是不是_或者$开头的
      // 这二个内部预留了
      if (/^[_$]/.test(key)) {
        throw new Error('The beginning of _and $is not allowed：' + key);
      }
      this[key] = options[key];
    }

    // 数据预处理
    if (isFunction(this.data)) {
      this.data = this.data();
    }

  };

};