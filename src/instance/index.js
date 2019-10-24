import { initMixin } from './init';
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle';
import { renderMixin } from './render';
import isFunction from '@yelloxing/core.js/isFunction';
import isElement from '@yelloxing/core.js/isElement';

function Abandon(options) {
  if (!(this instanceof Abandon)) {
    throw new Error('Abandon is a constructor and should be called with the `new` keyword');
  }

  if (isFunction(options.beforeCreate)) {
    options.beforeCreate.call();
  }

  // 初始化对象
  this._init(options);

  if (isFunction(this.created)) {
    this.created.call(this);
  }

  // 检查是否需要挂载到页面
  if (isElement(this.el)) {
    this.$mount(this.el);
  }

}

// 混淆进入最基本的方法
initMixin(Abandon);

// 混淆事件相关方法
eventsMixin(Abandon);

// 混淆进去生命周期相关方法
lifecycleMixin(Abandon);

// 混淆渲染组件的方法
renderMixin(Abandon);

export default Abandon;