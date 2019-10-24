'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
* abandon v0.1.4-alpha
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
        textBind = [];

    attrs = attrs || {};
    for (var key in attrs) {

      // 指令什么的特殊属性稍后添加判断
      node[key] = attrs[key];
    }

    // 迭代子孩子
    children = children || [];
    for (var i = 0; i < children.length; i++) {
      var childNode = children[i];

      // 如果是字符串，需要变成结点
      if (isString(childNode)) {
        var text = childNode;
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

        // 合并文本结点
        for (var _i2 = 0; _i2 < childNode.textBind.length; _i2++) {
          textBind.push(childNode.textBind[_i2]);
        }

        // 非文本结点，我们需要追加指令统计
        // todo
      }

      // 追加
      node.appendChild(childNode.el);
    }

    return {
      el: node,
      directive: directive,
      textBind: textBind
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

    // 挂载真实结点到页面
    var newEl = abandon.vnode.el;
    newEl.setAttribute('uid', abandon._uid);
    abandon.el.parentNode.replaceChild(newEl, abandon.el);

    // 第一次更新
    update.call(abandon);

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

      /**
       * 开始重新渲染页面
       * ----------------------------------
       */
      var _this = this;

      // 更新文本结点
      var textBinds = this.vnode.textBind;
      for (var i = 0; i < textBinds.length; i++) {
        var text = textBinds[i].text.replace(/{{[^}]+}}/g, function (oldValue) {
          var value = get(_this, oldValue.replace('{{', '').replace('}}', ""));
          return value;
        });
        var newEl = document.createTextNode(text);
        textBinds[i].el.parentNode.replaceChild(newEl, textBinds[i].el);
        textBinds[i].el = newEl;
      }

      /**
       * 结束重新渲染页面
       * ----------------------------------
       */

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

  function createRenderFactroy(template) {}

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

  // 混淆进去生命周期相关方法
  lifecycleMixin(Abandon);

  function outHTML(el) {
    if (el.outerHTML) {
      return el.outerHTML;
    } else {
      var container = document.createElement('div');
      container.appendChild(el.cloneNode(true));
      return container.innerHTML;
    }
  }

  Abandon.prototype.$mount = function (el) {

    // 警告：本版本不采用render方式
    if (!isFunction(this.render)) {
      // 如果template没有设置或设置的不是字符串
      if (!this.template || !isString(this.template)) {

        // 直接选择el
        this.template = outHTML(el);
      }

      this.render = createRenderFactroy(template);
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