import Watcher from '../observe/watcher';
import isFunction from '@yelloxing/core.js/isFunction';
import { toNode } from '../_utils/tool';
import get from '@yelloxing/core.js/get';

export function lifecycleMixin(Abandon) {

  Abandon.prototype._update = function () {
    if (isFunction(this.beforeUpdate)) {
      this.beforeUpdate.call(this);
    }

    // 检查全部的{{}}
    let _this = this;
    this.template = this.template.replace(/{{[^}]+}}/g, function (oldValue) {
      let value = get(_this, oldValue.replace('{{', '').replace('}}', ""));
      return value;
    });

    let newEl = toNode(this.template);
    this.el.parentNode.replaceChild(newEl, this.el);

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