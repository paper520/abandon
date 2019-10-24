export function outHTML(el) {
  if (el.outerHTML) {
    return el.outerHTML;
  } else {
    const container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML;
  }
};

export function toNode(template) {
  const container = document.createElement('div');
  container.innerHTML = template;
  return container.firstElementChild;
};