/**
 * =========================================
 * 本文件用于提供一些零碎的方法
 */

import isElement from '@yelloxing/core.js/isElement';

/**
 * 获取结点的outHTML
 * @param {node} el 结点
 * @return {string} 字符串模板
 */
export function outHTML(el) {
  if (el.outerHTML) {
    return el.outerHTML;
  } else {
    const container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML;
  }
};

/**
 * 把字符串模板变成结点
 * @param {node|string} template 结点或字符串模板
 * @return {node} 结点
 */
export function toNode(template) {
  if (isElement(template)) {
    return template;
  }

  // 如果是字符串模板
  const container = document.createElement('div');
  container.innerHTML = template;
  return container.firstElementChild;
};

/**
 * 一个单纯的绑定事件方法
 * @param {dom} target 结点
 * @param {string} eventType 浏览器事件，比如click,dblclick等
 * @param {function} callback 回调函数
 */
export function bind(target, eventType, callback) {
  if (window.attachEvent) {
    target.attachEvent("on" + eventType, callback); // 后绑定的先执行
  } else {
    target.addEventListener(eventType, callback, false);// 捕获
  }
};