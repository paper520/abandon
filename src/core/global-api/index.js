/**
 * =========================================
 * 挂载全局指令，组件等全局方法
 */
export default function (Abandon) {

  Abandon.prototype.$directive = {};
  // 挂载全局指令方法
  // 指令options可配置项有：
  //    1.bind（关联到结点触发）
  //    2.inserted（关联的结点插入页面触发）
  //    3.update（数据改变更新触发）
  Abandon.directive = function (name, options) {
    if (Abandon.prototype.$directive[name]) {
      throw new Error('The directive has already been defined:v-' + name);
    }
    Abandon.prototype.$directive[name] = options;
  };

  Abandon.prototype.$component = {};
  // 挂载全局组件方法
  // 组件options可配置项等情况和Abandon对象一致
  Abandon.component = function (name, options) {
    if (Abandon.prototype.$component[name]) {
      throw new Error('The component has already been defined:ui-' + name);
    }
    Abandon.prototype.$component[name] = options;
  };

  // 创建组件方法
  Abandon.prototype._new = function (options) {
    return new Abandon(options);
  };

};