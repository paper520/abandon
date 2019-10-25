// 一个单纯的绑定事件方法
let bind = function (target, eventType, callback) {
  if (window.attachEvent) {
    target.attachEvent("on" + eventType, callback); // 后绑定的先执行
  } else {
    target.addEventListener(eventType, callback, false);// 捕获
  }
};

export function eventsMixin(Abandon) {

  // 具体的绑定@event事件的方法
  Abandon.prototype._bind = function (el, type, callbackTemplate) {
    let _this = this;

    // 方法名称
    let callback_name = callbackTemplate.replace(/\([^)]{0,}\)/, '');

    // 绑定
    bind(el, type, function () {

      // 执行方法
      // 帮助：默认参数等参数问题目前没有考虑
      _this.methods[callback_name].apply(_this);
    });
  };

};