import get from '@yelloxing/core.js/get';

// 更新{{}}的值
let refurbishTextBind = function (_this, textBinds) {
  for (let i = 0; i < textBinds.length; i++) {

    // 解析{{message}}这样的值
    // 目前只支持这种单一的方式
    let text = textBinds[i].text.replace(/{{[^}]+}}/g, oldValue => {
      let value = get(_this, oldValue.replace('{{', '').replace('}}', ""));
      return value;
    });

    // 替换文本结点
    let newEl = document.createTextNode(text);
    textBinds[i].el.parentNode.replaceChild(newEl, textBinds[i].el);
    textBinds[i].el = newEl;
  }
};

import createElement from '../vnode/create-element';
import watcher from '../observe/watcher';

export function renderMixin(Abandon) {

  // 根据render生成dom挂载到挂载点
  // 并调用watcher启动数据监听
  // 并调用events方法开启@事件注册
  // 并记录其中的组件，指令和{{}}等
  Abandon.prototype._mountComponent = function (el) {

    // 获取虚拟结点
    const vnode = this.render(createElement);

    // 挂载真实结点到页面
    let newEl = vnode.el;
    this.el.parentNode.replaceChild(newEl, this.el);
    this.el = newEl;

    // 挂载好指令等需要update的时候维护的数据
    this.$directiveE = vnode.directive;
    this.$textBindE = vnode.textBind;

    // 第一次主动更新{{}}的值
    refurbishTextBind(this, this.$textBindE);

    // 启动数据监听
    watcher(this);

    // 绑定事件
    for (let i = 0; i < vnode.event.length; i++) {
      this._bind(vnode.event[i].el, vnode.event[i].name.replace(/^@/, ''), vnode.event[i].value);
    }

    // 建立子组件
    for (let i = 0; i < vnode.component.length; i++) {

      // 获取我们注册的组件
      let component = this.$component[vnode.component[i].tagName];

      // 设置挂载点
      component.el = vnode.component[i].el;

      let newThis = this._new(component);

      // 通过$pid把组件之间的父子关系挂起来，方便后期数据传递
      newThis.$pid = this.$uid;
    }

  };

  // 第一次或数据改变的时候，更新页面
  Abandon.prototype._updateComponent = function () {


    // 更新{{}}的值
    refurbishTextBind(this, this.$textBindE);

    // 更新指令

  };

};

import { toNode } from '../../utils/tool';
import isElement from '@yelloxing/core.js/isElement';
import isText from '@yelloxing/core.js/isText';

/**
 * 根据字符串模板生成render函数
 * @param {string} template 字符串模板
 * @return {function} render函数
 */
export function createRenderFactroy(template) {
  let doit = function (node, createElement) {
    let childNodes = node.childNodes, childRenders = [];
    for (let i = 0; i < childNodes.length; i++) {

      // 如果是文本结点
      if (isText(childNodes[i])) {
        childRenders.push(childNodes[i].textContent);
      }

      // 如果是标签结点
      else if (isElement(childNodes[i])) {
        childRenders.push(doit(childNodes[i], createElement));
      }
    }

    // 记录属性
    let attrs = {};
    for (let i = 0; i < node.attributes.length; i++) {
      attrs[node.attributes[i].nodeName] = node.attributes[i].nodeValue;
    }

    // 返回生成的元素
    return createElement(node.tagName, attrs, childRenders);
  };

  return function (createElement) {
    return doit(toNode(template), createElement);
  };
};