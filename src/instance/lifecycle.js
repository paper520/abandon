import Watcher from '../observe/watcher';
import isFunction from '@yelloxing/core.js/isFunction';

export function lifecycleMixin(Abandon) {

  Abandon.prototype._update = function () {
    if (isFunction(this.beforeUpdate)) {
      this.beforeUpdate.call(this);
    }

    // 更新DOM
    this._update();

    if (isFunction(this.updated)) {
      this.updated.call(this);
    }
  };

};

// 挂载组件
export function mountComponent(abandon, el) {
  if (isFunction(abandon.beforeMount)) {
    abandon.beforeMount.call(abandon);
  }

  // 挂载并开始数据监听
  new Watcher(abandon, abandon._update);

  if (isFunction(abandon.mounted)) {
    abandon.mounted.call(abandon);
  }
};