import loginView from '../page/login';
import mainView from '../page/main';

/**
 * 目前只考虑了简单的一级路由
 * 多级和路由传递参数等更多功能可能在下一版本实现
 */
export default {
  routes: [{
    path: "/login",
    component: loginView
  }, {
    path: "/main",
    component: mainView
  }, {
    path: "/*",
    redirect: "/login"
  }]
};