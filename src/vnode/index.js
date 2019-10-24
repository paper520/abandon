import isString from '@yelloxing/core.js/isString';
export default function (tagName, attrs, children) {

  // 先不考虑自定义组件
  const node = document.createElement(tagName);

  let directive = [], textBind = [];

  attrs = attrs || {};
  for (let key in attrs) {

    // 指令什么的特殊属性稍后添加判断
    node[key] = attrs[key];
  }

  // 迭代子孩子
  children = children || [];
  for (let i = 0; i < children.length; i++) {
    let childNode = children[i];

    // 如果是字符串，需要变成结点
    if (isString(childNode)) {
      let text = childNode;
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

      // 合并文本结点
      for (let i = 0; i < childNode.textBind.length; i++) {
        textBind.push(childNode.textBind[i]);
      }

      // 非文本结点，我们需要追加指令统计
      // todo

    }

    // 追加
    node.appendChild(childNode.el);
  }

  return {
    el: node,
    directive,
    textBind
  };
};