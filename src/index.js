import Abandon from './instance/index';
import initGlobalAPI from './global-api/index';
import { outHTML } from './_utils/tool';
import isString from '@yelloxing/core.js/isString';
import { mountComponent } from './instance/lifecycle';

// 挂载全局的静态方法
initGlobalAPI(Abandon);

Abandon.prototype.$mount = function (el) {

  // 警告：本版本不采用render方式

  // 如果template没有设置或设置的不是字符串
  if (!this.template || !isString(this.template)) {

    // 直接选择el
    this.template = outHTML(el);
  }

  // 一切准备好了以后，挂载
  mountComponent(this, el);
};

if (typeof module === "object" && typeof module.exports === "object") {
  module.exports = Abandon;
} else {
  window.Abandon = Abandon;
} 