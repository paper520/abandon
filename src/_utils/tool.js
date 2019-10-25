export function outHTML(el) {
  if (el.outerHTML) {
    return el.outerHTML;
  } else {
    const container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML;
  }
};

import isElement from '@yelloxing/core.js/isElement';
export function toNode(template) {
  if (isElement(template)) {
    return template;
  }

  // 如果是字符串模板
  const container = document.createElement('div');
  container.innerHTML = template;
  return container.firstElementChild;
};