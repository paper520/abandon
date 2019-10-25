import bind from './directives/v-bind';
import model from './directives/v-model';

import component from './components/component';

export default function (Abandon) {

  // 注册指令方法
  /**
   * bind
   * inserted
   * update
   */
  Abandon.prototype.$directive = {};
  Abandon.directive = function (name, config) {
    Abandon.prototype.$directive[name] = config;
  };

  // 注册内部指令
  Abandon.directive('bind', bind);
  Abandon.directive('model', model);

  // 注册组件方法
  /**
   * template
   * data
   * methods
   * beforeCreate
   * created
   * beforeMount
   * mounted
   * beforeUpdate
   * updated
   * beforeDestroy
   * destroyed
   */
  Abandon.prototype.$component = {};
  Abandon.component = function (name, config) {
    Abandon.prototype.$component[name] = config;
  };

  // 注册内部组件
  Abandon.component('component', component);

};