import isString from '@yelloxing/core.js/isString';
export default function (tagName, attrs, children) {

  // 先不考虑自定义组件
  const node = document.createElement(tagName);

  let directive = [], event = [], textBind = [];

  attrs = attrs || {};
  for (let key in attrs) {

    // 指令
    if (/^v-/.test(key)) {
      directive.push({
        el: node,
        name: key.replace('v-',''),
        value: attrs[key]
      });
    }

    // 结点事件
    else if (/^@/.test(key)) {
      event.push({
        el: node,
        name: key,
        value: attrs[key]
      });
    }

    // 普通属性
    else {
      node.setAttribute(key, attrs[key]);
    }

  }

  // 迭代子孩子
  children = children || [];
  for (let i = 0; i < children.length; i++) {
    let childNode = children[i];

    // 如果是字符串，需要变成结点
    if (isString(childNode)) {
      let text = childNode;

      // 空白、回车等完全空白的不记录
      if (/^[\x20\t\r\n\f]{0,}$/.test(text)) {
        continue;
      }

      childNode = {
        el: document.createTextNode(text),
        text
      };

      // 特殊的文本结点
      textBind.push(childNode);


    } else {

      // 合并指令
      for (let i = 0; i < childNode.directive.length; i++) {
        directive.push(childNode.directive[i]);
      }

      // 合并事件
      for (let i = 0; i < childNode.event.length; i++) {
        event.push(childNode.event[i]);
      }

      // 合并文本结点
      for (let i = 0; i < childNode.textBind.length; i++) {
        textBind.push(childNode.textBind[i]);
      }

    }

    // 追加
    node.appendChild(childNode.el);
  }

  return {
    el: node,
    directive,
    textBind,
    event
  };
};