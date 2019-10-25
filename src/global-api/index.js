import bind from './directives/v-bind';
import model from './directives/v-model';

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

};