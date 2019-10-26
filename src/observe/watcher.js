import createElement from '../vnode/index';
import get from '@yelloxing/core.js/get';
import isFunction from '@yelloxing/core.js/isFunction';

// 我们需要在这里挂载好结点
// 同时编译（就是获取需要同步的数据、指令、组件等信息）
export default function (abandon, update) {

  // 获取虚拟结点
  abandon.vnode = abandon.render(createElement);

  for (let i = 0; i < abandon.vnode.component.length; i++) {
    let component = abandon.$component[abandon.vnode.component[i].tagName];
    component.el = abandon.vnode.component[i].el;
    component._pid = abandon._uid;
    abandon.new(component);
  }

  /*---------指令bind-----------*/
  for (let i = 0; i < abandon.vnode.directive.length; i++) {
    let directive = abandon.vnode.directive[i];
    if (isFunction(abandon.$directive[directive.name].bind)) {
      abandon.$directive[directive.name].bind.call(
        abandon.$directive[directive.name],
        directive.el,
        {
          value: get(abandon, directive.value),
          arg: directive.value,
          target: abandon
        }
      );
    }
  }

  // 挂载真实结点到页面
  let newEl = abandon.vnode.el;
  newEl.setAttribute('uid', abandon._uid);
  if (abandon._pid) {
    newEl.setAttribute('pid', abandon._pid);
  }
  abandon.el.parentNode.replaceChild(newEl, abandon.el);

  // 第一次更新
  update.call(abandon);


  /*---------指令inserted-----------*/
  for (let i = 0; i < abandon.vnode.directive.length; i++) {
    let directive = abandon.vnode.directive[i];
    if (isFunction(abandon.$directive[directive.name].inserted)) {
      abandon.$directive[directive.name].inserted.call(
        abandon.$directive[directive.name],
        directive.el,
        {
          value: get(abandon, directive.value),
          arg: directive.value,
          target: abandon
        }
      );
    }
  }

  // 挂载事件
  let events = abandon.vnode.event;
  for (let i = 0; i < events.length; i++) {
    abandon._bind(events[i].el, events[i].name.replace(/^@/, ""), events[i].value);
  }

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

        /*---------指令update-----------*/
        for (let i = 0; i < abandon.vnode.directive.length; i++) {
          let directive = abandon.vnode.directive[i];
          if (isFunction(abandon.$directive[directive.name].update)) {
            abandon.$directive[directive.name].update.call(
              abandon.$directive[directive.name],
              directive.el,
              {
                value: get(abandon, directive.value),
                arg: directive.value,
                target: abandon
              }
            );
          }
        }
      }
    });
  }

};