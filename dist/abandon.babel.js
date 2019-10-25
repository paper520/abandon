'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
* abandon v0.2.1
* (c) 2007-2019 心叶 git+https://github.com/yelloxing/abandon.git
* License: MIT
*/

(function () {
  'use strict';

  var toString = Object.prototype.toString;

  /**
   * 获取一个值的类型字符串[object type]
   *
   * @private
   * @param {*} value 需要返回类型的值
   * @returns {string} 返回类型字符串
   */
  function getType(value) {
    if (value == null) {
      return value === undefined ? '[object Undefined]' : '[object Null]';
    }
    return toString.call(value);
  }

  /**
   * 判断一个值是不是Object。
   *
   * @since V0.1.2
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是Object返回true，否则返回false
   */
  function isObject(value) {
    var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
    return value != null && (type === 'object' || type === 'function');
  }

  /**
   * 判断一个值是不是Function。
   *
   * @since V0.1.2
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是Function返回true，否则返回false
   */
  function isFunction(value) {
    if (!isObject(value)) {
      return false;
    }

    var type = getType(value);
    return type === '[object Function]' || type === '[object AsyncFunction]' || type === '[object GeneratorFunction]' || type === '[object Proxy]';
  }

  var uid = 0;

  function initMixin(Abandon) {

    // 对象初始化
    Abandon.prototype._init = function (options) {

      var abandon = this;
      abandon._uid = uid++;
      options = options || {};

      for (var key in options) {
        abandon[key] = options[key];
      }

      // 数据预处理
      if (isFunction(abandon.data)) {
        abandon.data = abandon.data.call(abandon);
      }
    };
  }

  /**
   * 判断一个值是不是一个朴素的'对象'
   *
   * @private
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是朴素的'对象'返回true，否则返回false
   */

  function isPlainObject(value) {
    if (value === null || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' || getType(value) != '[object Object]') {
      return false;
    }

    // 如果原型为null
    if (Object.getPrototypeOf(value) === null) {
      return true;
    }

    var proto = value;
    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(value) === proto;
  }

  /**
   * 判断一个值是不是结点元素。
   *
   * @since V0.1.2
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是结点元素返回true，否则返回false
   */
  function isElement(value) {
    return value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && (value.nodeType === 1 || value.nodeType === 9 || value.nodeType === 11) && !isPlainObject(value);
  }

  function outHTML(el) {
    if (el.outerHTML) {
      return el.outerHTML;
    } else {
      var container = document.createElement('div');
      container.appendChild(el.cloneNode(true));
      return container.innerHTML;
    }
  }function toNode(template) {
    if (isElement(template)) {
      return template;
    }

    // 如果是字符串模板
    var container = document.createElement('div');
    container.innerHTML = template;
    return container.firstElementChild;
  }
  // 一个单纯的绑定事件方法
  function _bind(target, eventType, callback) {
    if (window.attachEvent) {
      target.attachEvent("on" + eventType, callback); // 后绑定的先执行
    } else {
      target.addEventListener(eventType, callback, false); // 捕获
    }
  }

  function eventsMixin(Abandon) {

    // 具体的绑定@event事件的方法
    Abandon.prototype._bind = function (el, type, callbackTemplate) {
      var _this = this;

      // 方法名称
      var callback_name = callbackTemplate.replace(/\([^)]{0,}\)/, '');

      // 绑定
      _bind(el, type, function () {

        // 执行方法
        // 帮助：默认参数等参数问题目前没有考虑
        _this.methods[callback_name].apply(_this);
      });
    };
  }

  /**
   * 判断一个值是不是String。
   *
   * @since V0.1.2
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是String返回true，否则返回false
   */
  function isString(value) {
    var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
    return type === 'string' || type === 'object' && value != null && !Array.isArray(value) && getType(value) === '[object String]';
  }

  function createElement(tagName, attrs, children) {

    // 先不考虑自定义组件
    var node = document.createElement(tagName);

    var directive = [],
        event = [],
        textBind = [];

    attrs = attrs || {};
    for (var key in attrs) {

      // 指令
      if (/^v-/.test(key)) {
        directive.push({
          el: node,
          name: key.replace('v-', ''),
          value: attrs[key]
        });
      }

      // 结点事件
      else if (/^@/.test(key)) {
          event.push({
            el: node,
            name: key,
            value: attrs[key]
          });
        }

        // 普通属性
        else {
            node.setAttribute(key, attrs[key]);
          }
    }

    // 迭代子孩子
    children = children || [];
    for (var i = 0; i < children.length; i++) {
      var childNode = children[i];

      // 如果是字符串，需要变成结点
      if (isString(childNode)) {
        var text = childNode;

        // 空白、回车等完全空白的不记录
        if (/^[\x20\t\r\n\f]{0,}$/.test(text)) {
          continue;
        }

        childNode = {
          el: document.createTextNode(text),
          text: text
        };

        // 特殊的文本结点
        textBind.push(childNode);
      } else {

        // 合并指令
        for (var _i = 0; _i < childNode.directive.length; _i++) {
          directive.push(childNode.directive[_i]);
        }

        // 合并事件
        for (var _i2 = 0; _i2 < childNode.event.length; _i2++) {
          event.push(childNode.event[_i2]);
        }

        // 合并文本结点
        for (var _i3 = 0; _i3 < childNode.textBind.length; _i3++) {
          textBind.push(childNode.textBind[_i3]);
        }
      }

      // 追加
      node.appendChild(childNode.el);
    }

    return {
      el: node,
      directive: directive,
      textBind: textBind,
      event: event
    };
  }

  /**
   * 判断一个值是不是symbol。
   *
   * @since V0.1.2
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是symbol返回true，否则返回false
   */
  function isSymbol(value) {
    var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
    return type === 'symbol' || type === 'object' && value !== null && getType(value) === '[object Symbol]';
  }

  /**
   * 判断是不是一个对象上的属性
   *
   * @private
   * @param {Array|string} path 属性或路径
   * @param {Object} object 操作的对象
   * @returns {boolean} 如果是返回true，否则返回false
   */

  function isKey(value, object) {

    if (Array.isArray(value)) {
      return false;
    }

    var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
    if (type == 'number' || type == 'boolean' || value == null || isSymbol(value)) {
      return true;
    }

    return object !== null && value in Object(object) || /^\w*$/.test(value);
  }

  /**
   * 把字符串路径变成简单的数组
   *
   * @private
   * @param {string} value 需要解析的路径字符串
   * @returns {Array} 返回属性数组
   */
  function stringToPath(value) {
    return value.replace(/\[/g, ".").replace(/\]/g, '').replace(/"/g, "").replace(/'/g, "").split('.');
  }

  /**
   * 把属性字符串统一变成数组（数组每个值是一个简单的属性）
   *
   * @private
   * @param {Array|string} path 属性或路径
   * @param {Object} object 操作的对象
   * @returns {Array} 返回属性数组
   */
  function castPath(value, object) {
    if (Array.isArray(value)) {
      return value;
    }
    return isKey(value, object) ? [value] : stringToPath(value);
  }

  var INFINITY = 1 / 0;

  /**
   * 如果value不是字符串或者symbol，就变成字符串
   *
   * @private
   * @param {*} value 需要检查的值
   * @returns {string|symbol} 返回key
   */
  function toKey(value) {
    if (typeof value === 'string' || isSymbol(value)) {
      return value;
    }

    var result = '' + value;
    return result === '0' && 1 / value === -INFINITY ? "-0" : result;
  }

  /**
   * 获取一个对象属性值的基础方法，没有默认值。
   *
   * @private
   * @param {Object} object 操作的对象
   * @param {Array|string} path 属性或路径
   * @returns {*} 返回设置的结果
   */
  function baseGet(object, path) {

    // 统一把路径变成['a','b','c',...]这种
    path = castPath(path, object);

    var index = 0;
    for (; index < path.length && object !== null; index++) {
      object = object[toKey(path[index])];
    }

    return index && index === path.length ? object : undefined;
  }

  /**
   * 获取object的属性path的值。如果返回的值是undefined，
   * defaultValue就作为返回值返回。
   *
   * @since V0.1.0
   * @public
   * @param {Object} object 查询的对象
   * @param {Array|string} path 对象上查询值的路径
   * @param {*} defaultValue 值为undefined的时候的返回值
   * @returns {*} 返回结果
   * @example
   *
   * var object={a:{b:[1,2,3]}};
   *
   * get(object,'a.b') or
   * get(object,['a','b'])
   * // [1,2,3]
   *
   * get(object,'a["b"][1]')
   * // 2
   *
   * get(object,'a.c','default')
   * // 'default'
   */

  function get(object, path, defaultValue) {
    var result = object == null ? undefined : baseGet(object, path);
    return result === undefined ? defaultValue : result;
  }

  // 我们需要在这里挂载好结点
  // 同时编译（就是获取需要同步的数据、指令、组件等信息）
  function Watcher(abandon, update) {

    // 获取虚拟结点
    abandon.vnode = abandon.render(createElement);

    /*---------指令bind-----------*/
    for (var i = 0; i < abandon.vnode.directive.length; i++) {
      var directive = abandon.vnode.directive[i];
      if (isFunction(abandon.$directive[directive.name].bind)) {
        abandon.$directive[directive.name].bind.call(abandon.$directive[directive.name], directive.el, {
          value: get(abandon, directive.value),
          arg: directive.value,
          target: abandon
        });
      }
    }

    // 挂载真实结点到页面
    var newEl = abandon.vnode.el;
    newEl.setAttribute('uid', abandon._uid);
    abandon.el.parentNode.replaceChild(newEl, abandon.el);

    // 第一次更新
    update.call(abandon);

    /*---------指令inserted-----------*/
    for (var _i4 = 0; _i4 < abandon.vnode.directive.length; _i4++) {
      var _directive = abandon.vnode.directive[_i4];
      if (isFunction(abandon.$directive[_directive.name].inserted)) {
        abandon.$directive[_directive.name].inserted.call(abandon.$directive[_directive.name], _directive.el, {
          value: get(abandon, _directive.value),
          arg: _directive.value,
          target: abandon
        });
      }
    }

    // 挂载事件
    var events = abandon.vnode.event;
    for (var _i5 = 0; _i5 < events.length; _i5++) {
      abandon._bind(events[_i5].el, events[_i5].name.replace(/^@/, ""), events[_i5].value);
    }

    // 注册数据改变的时候触发更新

    var _loop = function _loop(key) {
      var value = get(abandon.data, key);

      // 针对data进行拦截，后续对data的数据添加不会自动监听了
      Object.defineProperty(abandon.data, key, {
        get: function get() {
          return value;
        },
        set: function set(newValue) {
          value = newValue;
          update.call(abandon);

          /*---------指令update-----------*/
          for (var _i6 = 0; _i6 < abandon.vnode.directive.length; _i6++) {
            var _directive2 = abandon.vnode.directive[_i6];
            if (isFunction(abandon.$directive[_directive2.name].update)) {
              abandon.$directive[_directive2.name].update.call(abandon.$directive[_directive2.name], _directive2.el, {
                value: get(abandon, _directive2.value),
                arg: _directive2.value,
                target: abandon
              });
            }
          }
        }
      });
    };

    for (var key in abandon.data) {
      _loop(key);
    }
  }

  function lifecycleMixin(Abandon) {

    Abandon.prototype._update = function () {

      if (isFunction(this.beforeUpdate)) {
        this.beforeUpdate.call(this);
      }

      // 更新DOM
      this._refurbish();

      if (isFunction(this.updated)) {
        this.updated.call(this);
      }
    };
  }
  // 挂载组件
  function mountComponent(abandon, el) {
    if (isFunction(abandon.beforeMount)) {
      abandon.beforeMount.call(abandon);
    }

    // 挂载并开始数据监听
    new Watcher(abandon, abandon._update);

    if (isFunction(abandon.mounted)) {
      abandon.mounted.call(abandon);
    }
  }

  /**
   * 判断一个值是不是文本结点。
   *
   * @since V0.1.2
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是结点元素返回true，否则返回false
   */
  function isText(value) {
    return value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.nodeType === 3 && !isPlainObject(value);
  }

  function renderMixin(Abandon) {

    // 第一次或数据改变的时候，更新页面
    Abandon.prototype._refurbish = function () {
      var _this2 = this;

      // 更新文本结点
      var textBinds = this.vnode.textBind;
      for (var i = 0; i < textBinds.length; i++) {

        // 解析{{message}}这样的值
        // 目前只支持这种单一的方式
        var text = textBinds[i].text.replace(/{{[^}]+}}/g, function (oldValue) {
          var value = get(_this2, oldValue.replace('{{', '').replace('}}', ""));
          return value;
        });

        // 替换文本结点
        var newEl = document.createTextNode(text);
        textBinds[i].el.parentNode.replaceChild(newEl, textBinds[i].el);
        textBinds[i].el = newEl;
      }
    };
  }
  // 根据字符串模板生成render函数
  function createRenderFactroy(template) {

    var doit = function doit(node, createElement) {
      var childNodes = node.childNodes,
          childRenders = [];
      for (var i = 0; i < childNodes.length; i++) {

        // 如果是文本结点
        if (isText(childNodes[i])) {
          childRenders.push(childNodes[i].textContent);
        }

        // 如果是标签结点
        else if (isElement(childNodes[i])) {
            childRenders.push(doit(childNodes[i], createElement));
          }
      }

      // 记录属性
      var attrs = {};
      for (var _i7 = 0; _i7 < node.attributes.length; _i7++) {
        attrs[node.attributes[_i7].nodeName] = node.attributes[_i7].nodeValue;
      }

      // 返回生成的元素
      return createElement(node.tagName, attrs, childRenders);
    };

    return function (createElement) {
      return doit(toNode(template), createElement);
    };
  }

  function Abandon(options) {
    if (!(this instanceof Abandon)) {
      throw new Error('Abandon is a constructor and should be called with the `new` keyword');
    }

    if (isFunction(options.beforeCreate)) {
      options.beforeCreate.call();
    }

    // 初始化对象
    this._init(options);

    if (isFunction(this.created)) {
      this.created.call(this);
    }

    // 检查是否需要挂载到页面
    if (isElement(this.el)) {
      this.$mount(this.el);
    }
  }

  // 混淆进入最基本的方法
  initMixin(Abandon);

  // 混淆事件相关方法
  eventsMixin(Abandon);

  // 混淆进去生命周期相关方法
  lifecycleMixin(Abandon);

  // 混淆渲染组件的方法
  renderMixin(Abandon);

  var bind$1 = {
    bind: function bind(el, binding) {
      el.value = el.textContent = binding.value;
    },
    update: function update(el, binding) {
      el.value = el.textContent = binding.value;
    }
  };

  /**
   * 设置值的基本方法（没有进行值检查）
   *
   * @private
   * @param {Object} object 设置的对象
   * @param {string} key 需要设置的属性
   * @param {*} value 设置的值
   */
  function baseAssignValue(object, key, value) {
    if (key == '__proto__') {
      Object.defineProperty(object, key, {
        'configurable': true,
        'enumerable': true,
        'value': value,
        'writable': true
      });
    } else {
      object[key] = value;
    }
  }

  /**
   *设置对象的值
   *
   * @private
   * @param {Object} object 设置的对象
   * @param {string} key 需要设置的属性
   * @param {*} value 设置的值
   */
  function assignValue(object, key, value) {
    baseAssignValue(object, key, value);
  }

  /**
   * 设置一个对象属性值的基础方法。
   *
   * @private
   * @param {Object} object 设置的对象
   * @param {Array|string} path 对象上设置值的路径
   * @param {*} value 设置的值
   * @param {*} customizer 可选，一个函数，用于返回补充的类型（比如[],{}等）
   * @returns {Object} 返回一个对象
   */
  function baseSet(object, path, value, customizer) {
    if (!isObject(object)) {
      return object;
    }
    path = castPath(path, object);

    var nested = object;

    for (var index = 0; index < path.length; index++) {
      var key = toKey(path[index]);
      var newValue = value;

      // 如果不是最后一个，需要一些检测
      if (index + 1 != path.length) {

        var objValue = nested[key];

        // 可能有的时候，原来的对象层次不足，需要补充，这里是选择应该补充什么类型
        if (!isObject(objValue)) {

          newValue = customizer ? customizer(objValue, key, nested) : undefined;
          if (newValue === undefined) {
            newValue = {};
          }
        } else {
          newValue = objValue;
        }
      }

      assignValue(nested, key, newValue);
      nested = nested[key];
    }

    return object;
  }

  /**
   * 设置object的属性path的新值，返回设置后的对象。
   *
   * @since V0.1.0
   * @public
   * @param {Object} object 设置的对象
   * @param {Array|string} path 对象上设置值的路径
   * @param {*} value 设置的值
   * @param {*} customizer 可选，一个函数，用于返回补充的类型（比如[],{}等）
   * @returns {Object} 返回一个对象
   * @example
   *
   * var object={a:{b:[1,2,3]}};
   *
   * set(object,'a.b.c',10)
   * // {a:{b:[1,2,3]}}
   */
  function set(object, path, value, customizer) {
    customizer = typeof customizer === 'function' ? customizer : undefined;
    return object == null ? object : baseSet(object, path, value, customizer);
  }

  var model = {
    bind: function bind(el, binding) {
      el.value = binding.value;
      _bind(el, 'input', function () {
        set(binding.target, binding.arg, el.value);
      });
    },
    update: function update(el, binding) {
      el.value = binding.value;
    }
  };

  function initGlobalAPI(Abandon) {

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
    Abandon.directive('bind', bind$1);
    Abandon.directive('model', model);
  }

  // 挂载全局的静态方法
  initGlobalAPI(Abandon);

  Abandon.prototype.$mount = function (el) {

    if (!isFunction(this.render)) {
      // 如果template没有设置或设置的不是字符串
      if (!this.template || !isString(this.template)) {

        // 直接选择el
        this.template = outHTML(el);
      }

      // 根据template生成render函数
      this.render = createRenderFactroy(this.template);
    }

    // 一切准备好了以后，挂载
    mountComponent(this);
  };

  if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
    module.exports = Abandon;
  } else {
    window.Abandon = Abandon;
  }
})();