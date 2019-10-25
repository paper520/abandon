import get from '@yelloxing/core.js/get';

export function renderMixin(Abandon) {

  // 第一次或数据改变的时候，更新页面
  Abandon.prototype._refurbish = function () {
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

  };

};

import { toNode } from '../_utils/tool';
import isElement from '@yelloxing/core.js/isElement';
import isText from '@yelloxing/core.js/isText';

// 根据字符串模板生成render函数
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