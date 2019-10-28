/**
 * 备注：除非特殊情况，_开头的表示内置方法，$开头的表示内置资源
 * =========================================
 * 整合全部资源，对外暴露调用接口
 */

import initGlobalAPI from './core/global-api/index';
import Abandon from './core/instance/index';

// 挂载全局方法
initGlobalAPI(Abandon);

import vBind from './modules/directives/bind';
import vModel from './modules/directives/model';

// 挂载内置指令
Abandon.directive("bind", vBind); // v-bind单向绑定
Abandon.directive("model", vModel); // v-model双向绑定

import uiComponent from './modules/components/component';
import uiRouter from './modules/components/router';

// 注册内置组件
Abandon.component("component", uiComponent); // 动态组件
Abandon.component("router", uiRouter); // 路由

import { outHTML } from './utils/tool';
import isString from '@yelloxing/core.js/isString';
import isFunction from '@yelloxing/core.js/isFunction';
import { createRenderFactroy } from './core/instance/render';

// 把组件挂载到页面中去
Abandon.prototype._mount = function (el) {

  if (!isFunction(this.render)) {

    let template = this.template;

    // 如果template没有设置或设置的不是字符串
    if (!template || !isString(template)) {

      // 直接选择el
      template = outHTML(el);
    }

    // 根据template生成render函数
    this.render = createRenderFactroy(template);
  }

  // 一切准备好了以后，正式挂载
  this._mountComponent(el);
};

// 根据运行环境，导出接口
if (typeof module === "object" && typeof module.exports === "object") {
  module.exports = Abandon;
} else {
  window.Abandon = Abandon;
} 