/**
 * 比如：检查参数是否合法，标记组件，部分数据需要预处理等基本操作
 * =========================================
 * 组件初始化
 */

import isFunction from '@yelloxing/core.js/isFunction';

let uid = 1;

export function initMixin(Abandon) {

  // 对象初始化
  Abandon.prototype._init = function (options) {

    if (options.router) {

      // 只有根结点才可以挂载路由
      if (uid !== 1) {
        throw new Error('Only the root node can configure and enable router！');
      }

      // 因为配置了路由，我们需要挂载路由控制方法
      let _this = this;
      Abandon.prototype.$router = {
        "states": [],
        "reload": () => {
          console.log(_this.$router.states);
        },
        "push": state => {
          _this.$router.states.push(state);
          _this.$router.reload();
        },
        "pop": () => {
          _this.$router.states.pop();
          _this.$router.reload();
        },
        "goto": state => {
          this.$router.states[this.$router.states.length] = state;
          _this.$router.reload();
        }
      };

    }

    this.$uid = uid++;
    options = options || {};

    for (let key in options) {
      // 判断是不是_或者$开头的
      // 这二个内部预留了
      if (/^[_$]/.test(key)) {
        throw new Error('The beginning of _and $is not allowed：' + key);
      }
      this[key] = options[key];
    }

    // 数据预处理
    if (isFunction(this.data)) {
      this.data = this.data();
    }

  };

};