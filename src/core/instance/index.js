/**
 * =========================================
 * Abandon对象
 */

import { initMixin } from './init';
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle';
import { renderMixin } from './render';
import isElement from '@yelloxing/core.js/isElement';

function Abandon(options) {
  if (!(this instanceof Abandon)) {
    throw new Error('Abandon is a constructor and should be called with the `new` keyword');
  }

  this._lifecycle(options.beforeCreate);

  // 初始化对象
  this._init(options);

  this._lifecycle('created');

  // 如果没有设置挂载点
  // 表示该组件不挂载
  // 不挂载的话，render或template也不会去解析
  // 或许可以在一定阶段以后，在主动去挂载，这样有益于提高效率
  if (isElement(this.el)) {
    this._lifecycle('beforeMount');

    // 挂载组件到页面
    this._mount(this.el);

    this._lifecycle('mounted');
  }

}

/**
 * 下面是混入几大核心功能的处理方法
 */
initMixin(Abandon);// 初始化对象
eventsMixin(Abandon);// 处理事件相关
lifecycleMixin(Abandon);// 和组件的生命周期相关调用
renderMixin(Abandon);// 组件渲染或更新相关

export default Abandon;