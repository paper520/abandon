import createElement from '../vnode/index';

// 我们需要在这里挂载好结点
// 同时编译（就是获取需要同步的数据、指令、组件等信息）
export default function (abandon, update) {

  // 获取虚拟结点
  abandon.vnode = abandon.render(createElement);

  // 挂载真实结点到页面
  let newEl = abandon.vnode.el;
  newEl.setAttribute('uid', abandon._uid);
  abandon.el.parentNode.replaceChild(newEl, abandon.el);

  // 第一次更新
  update.call(abandon);

  // 注册数据改变的时候触发更新
  // todo

};