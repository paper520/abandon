/**
 * =========================================
 * 组件的生命周期
 */

import isFunction from '@yelloxing/core.js/isFunction';

export function lifecycleMixin(Abandon) {

  // 生命周期调用钩子
  // 整个过程，进行到对应时期，都需要调用一下这里对应的钩子
  // 整合在一起的目的是方便维护
  Abandon.prototype._lifecycle = function (callbackName) {

    // beforeCreate
    if (isFunction(callbackName)) {
      callbackName();
      return;
    }

    if ([

      // 创建组件
      'created',

      // 挂载组件
      'beforeMount', 'mounted',

      // 更新组件
      'beforeUpdate', 'updated',

      // 销毁组件
      'beforeDestroy', 'destroyed'

    ].indexOf(callbackName) > -1 && isFunction(this[callbackName])) {
      this[callbackName].call(this);
    }

    if (this.$uid === 1 && callbackName === 'mounted') {

      // 解析地址栏的路由
      let routerString = (window.location.href + "#").split(/#\/{0,1}/)[1].replace(/\?.{0,}/, "").split('/');
      for (let i = 0; i < routerString.length; i++) {
        this.$router.push(routerString[i]);
      }

    }

  };

};