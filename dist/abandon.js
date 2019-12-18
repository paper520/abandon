/*!
* abandon v2.0.0-alpha
* (c) 2019-2019 心叶
* Released under the MIT License.
*/

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
  'use strict';

  /**
   * 备注：除非特殊情况，_开头的表示内置方法，$开头的表示内置资源
   * =========================================
   * 整合全部资源，对外暴露调用接口
   */

  var Abandon = function Abandon() {
    console.error('git+https://github.com/yelloxing/abandon.git');
  };

  if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
    module.exports = Abandon;
  } else {
    window.Abandon = Abandon;
  }
})();