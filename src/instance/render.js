import get from '@yelloxing/core.js/get';

export function renderMixin(Abandon) {

  Abandon.prototype._update = function () {
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

export function createRenderFactroy(template) {

};