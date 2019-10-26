import isFunction from '@yelloxing/core.js/isFunction';

let uid = 1;

export function initMixin(Abandon) {

  // 对象初始化
  Abandon.prototype._init = function (options) {

    const abandon = this;
    abandon._uid = uid++;
    options = options || {};

    for (let key in options) {
      abandon[key] = options[key];
    }

    // 数据预处理
    if (isFunction(abandon.data)) {
      abandon.data = abandon.data.call(abandon);
    }

  };

};