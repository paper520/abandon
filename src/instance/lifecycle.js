import Watcher from '../observe/watcher';
import isFunction from '@yelloxing/core.js/isFunction';
import get from '@yelloxing/core.js/get';

export function lifecycleMixin(Abandon) {

  Abandon.prototype._update = function () {
    if (isFunction(this.beforeUpdate)) {
      this.beforeUpdate.call(this);
    }

    /**
     * 开始重新渲染页面
     * ----------------------------------
     */
    let _this = this;

    // 更新文本结点
    const textBinds = this.vnode.textBind;
    for (let i = 0; i < textBinds.length; i++) {
      let text = textBinds[i].text.replace(/{{[^}]+}}/g, function (oldValue) {
        let value = get(_this, oldValue.replace('{{', '').replace('}}', ""));
        return value;
      });
      let newEl = document.createTextNode(text);
      textBinds[i].el.parentNode.replaceChild(newEl, textBinds[i].el);
      textBinds[i].el = newEl;
    }

    /**
     * 结束重新渲染页面
     * ----------------------------------
     */

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