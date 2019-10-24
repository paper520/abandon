import createElement from '../vnode/index';
import get from '@yelloxing/core.js/get';

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
  for (let key in abandon.data) {
    let value = get(abandon.data, key);

    // 针对data进行拦截，后续对data的数据添加不会自动监听了
    Object.defineProperty(abandon.data, key, {
      get() {
        return value;
      },
      set(newValue) {
        value = newValue;
        update.call(abandon);
      }
    });
  }

};