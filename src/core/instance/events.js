/**
 * =========================================
 * 事件相关的处理
 */

import { bind } from '../../utils/tool';

export function eventsMixin(Abandon) {

  // 具体的绑定@event事件的方法
  Abandon.prototype._bind = function (el, type, callbackTemplate) {
    let _this = this;

    // 方法名称
    let callback_name = callbackTemplate.replace(/\([^)]{0,}\)/, '');

    // 绑定
    bind(el, type, function () {

      // 执行方法
      // 帮助：默认参数等参数问题目前没有考虑
      _this.methods[callback_name].apply(_this);
    });
  };

};