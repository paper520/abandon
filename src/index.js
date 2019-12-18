/**
 * 备注：除非特殊情况，_开头的表示内置方法，$开头的表示内置资源
 * =========================================
 * 整合全部资源，对外暴露调用接口
 */

let Abandon = function () {
  console.error('git+https://github.com/yelloxing/abandon.git');
};

if (typeof module === "object" && typeof module.exports === "object") {
  module.exports = Abandon;
} else {
  window.Abandon = Abandon;
}