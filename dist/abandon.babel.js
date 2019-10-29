'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
* abandon v1.0.2-alpha
* (c) 2007-2019 心叶 git+https://github.com/yelloxing/abandon.git
* License: MIT
*/

(function () {
  'use strict';

  /**
   * =========================================
   * 挂载全局指令，组件等全局方法
   */

  function initGlobalAPI(Abandon) {

    Abandon.prototype.$directive = {};
    // 挂载全局指令方法
    // 指令options可配置项有：
    //    1.inserted（关联的结点插入页面触发）
    //    2.update（数据改变更新触发）
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
  }

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

  /**
   * 比如：检查参数是否合法，标记组件，部分数据需要预处理等基本操作
   * =========================================
   * 组件初始化
   */

  var uid = 1;

  function initMixin(Abandon) {

    // 对象初始化
    Abandon.prototype._init = function (options) {
      var _this2 = this;

      if (options.router) {

        // 只有根结点才可以挂载路由
        if (uid !== 1) {
          throw new Error('Only the root node can configure and enable router！');
        }

        // 因为配置了路由，我们需要挂载路由控制方法
        var _this = this;
        Abandon.prototype.$router = {
          "states": [],
          "reload": function reload() {
            console.log(_this.$router.states);
          },
          "push": function push(state) {
            _this.$router.states.push(state);
            _this.$router.reload();
          },
          "pop": function pop() {
            _this.$router.states.pop();
            _this.$router.reload();
          },
          "goto": function goto(state) {
            _this2.$router.states[_this2.$router.states.length] = state;
            _this.$router.reload();
          }
        };
      }

      this.$uid = uid++;
      options = options || {};

      for (var key in options) {
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

  /**
   * =========================================
   * 本文件用于提供一些零碎的方法
   */

  /**
   * 获取结点的outHTML
   * @param {node} el 结点
   * @return {string} 字符串模板
   */
  function outHTML(el) {
    if (el.outerHTML) {
      return el.outerHTML;
    } else {
      var container = document.createElement('div');
      container.appendChild(el.cloneNode(true));
      return container.innerHTML;
    }
  }
  /**
   * 把字符串模板变成结点
   * @param {node|string} template 结点或字符串模板
   * @return {node} 结点
   */
  function toNode(template) {
    if (isElement(template)) {
      return template;
    }

    // 如果是字符串模板
    var container = document.createElement('div');
    container.innerHTML = template;
    return container.firstElementChild;
  }
  /**
   * 一个单纯的绑定事件方法
   * @param {dom} target 结点
   * @param {string} eventType 浏览器事件，比如click,dblclick等
   * @param {function} callback 回调函数
   */
  function bind(target, eventType, callback) {
    if (window.attachEvent) {
      target.attachEvent("on" + eventType, callback); // 后绑定的先执行
    } else {
      target.addEventListener(eventType, callback, false); // 捕获
    }
  }

  /**
   * =========================================
   * 事件相关的处理
   */

  function eventsMixin(Abandon) {

    // 具体的绑定@event事件的方法
    Abandon.prototype._bind = function (el, type, callbackTemplate) {
      var _this = this;

      // 方法名称
      var callback_name = callbackTemplate.replace(/\([^)]{0,}\)/, '');

      // 绑定
      bind(el, type, function () {

        // 执行方法
        // 帮助：默认参数等参数问题目前没有考虑
        _this.methods[callback_name].apply(_this);
      });
    };
  }

  /**
   * =========================================
   * 组件的生命周期
   */

  function lifecycleMixin(Abandon) {

    // 生命周期调用钩子
    // 整个过程，进行到对应时期，都需要调用一下这里对应的钩子
    // 整合在一起的目的是方便维护
    Abandon.prototype._lifecycle = function (callbackName) {

      // beforeCreate
      if (isFunction(callbackName)) {
        callbackName();
        return;
      }

      if ([

      // 创建组件
      'created',

      // 挂载组件
      'beforeMount', 'mounted',

      // 更新组件
      'beforeUpdate', 'updated',

      // 销毁组件
      'beforeDestroy', 'destroyed'].indexOf(callbackName) > -1 && isFunction(this[callbackName])) {
        this[callbackName].call(this);
      }

      if (this.$uid === 1 && callbackName === 'mounted') {

        // 解析地址栏的路由
        var routerString = (window.location.href + "#").split(/#\/{0,1}/)[1].replace(/\?.{0,}/, "").split('/');
        for (var i = 0; i < routerString.length; i++) {
          this.$router.push(routerString[i]);
        }
      }
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

  /**
   * 备注：未来这里可能会修改成虚拟结点，进行优化
   * =========================================
   * 组件控制范围内的重要信息收集
   */

  /**
   * 创建vnode方法，并收集信息
   * @param {string} tagName 结点名称
   * @param {json} attrs 属性
   * @param {array[vnode|string]} children 孩子元素 
   * @return {element} 返回vnode
   */
  function createElement(tagName, attrs, children) {

    var node = document.createElement(tagName);

    if (/ui\-/.test(tagName.toLowerCase())) {
      // 如果是一个组件
      // 子结点失去意义
      return {
        el: node,
        tagName: tagName.toLowerCase(),
        attrs: attrs,
        directive: [],
        textBind: [],
        event: [],
        component: []
      };
    }

    var directive = [],
        event = [],
        textBind = [],
        component = [];

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

        childNode = {
          el: document.createTextNode(text),
          text: text
        };

        // 特殊的文本结点
        // 如果不包含{{}}这样的，不需要记录
        if (/{{[^}]+}}/.test(text)) {
          textBind.push(childNode);
        }
      } else {

        // 合并指令
        for (var _i = 0; _i < childNode.directive.length; _i++) {
          directive.push(childNode.directive[_i]);
        }

        // 合并事件
        for (var _i2 = 0; _i2 < childNode.event.length; _i2++) {
          event.push(childNode.event[_i2]);
        }

        // 合并组件
        for (var _i3 = 0; _i3 < childNode.component.length; _i3++) {
          component.push(childNode.component[_i3]);
        }

        // 合并文本结点
        for (var _i4 = 0; _i4 < childNode.textBind.length; _i4++) {
          textBind.push(childNode.textBind[_i4]);
        }
      }

      if (childNode.tagName) {
        component.push(childNode);
      }

      // 追加
      node.appendChild(childNode.el);
    }

    return {
      el: node,
      directive: directive,
      textBind: textBind,
      event: event,
      component: component
    };
  }

  /**
   * =========================================
   * 通过proxy的方式，对this.data中的数据进行拦截
   */

  function watcher(_this) {
    var _loop = function _loop(key) {
      var value = get(_this.data, key);

      // 针对data进行拦截，后续对data的数据添加不会自动监听了
      Object.defineProperty(_this.data, key, {
        get: function get() {
          return value;
        },
        set: function set(newValue) {
          _this._lifecycle('beforeUpdate');

          value = newValue;

          // 数据改变，触发更新
          _this._updateComponent();

          _this._lifecycle('updated');
        }
      });
    };

    for (var key in _this.data) {
      _loop(key);
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

  /**
   * =========================================
   * 所有和视图渲染相关的处理都在这里
   */

  // 更新{{}}的值
  var refurbishTextBind = function refurbishTextBind(_this, textBinds) {
    for (var i = 0; i < textBinds.length; i++) {

      // 解析{{message}}这样的值
      // 目前只支持这种单一的方式
      var text = textBinds[i].text.replace(/{{[^}]+}}/g, function (oldValue) {
        var value = get(_this, oldValue.replace('{{', '').replace('}}', ""));
        return value;
      });

      // 替换文本结点
      var newEl = document.createTextNode(text);
      textBinds[i].el.parentNode.replaceChild(newEl, textBinds[i].el);
      textBinds[i].el = newEl;
    }
  };

  // 触发指令中指定的生命周期钩子
  var renderDirective = function renderDirective(_this, directives, hookName) {
    for (var i = 0; i < directives.length; i++) {
      var directiveE = directives[i];
      var directive = _this.$directive[directiveE.name];

      // 如果指令没有注册
      if (!directive) {
        throw new Error('The directive is not registered:v-' + directiveE.name);
      }

      // 调用对应的生命周期钩子
      if (isFunction(directive[hookName])) {
        directive[hookName].call(directive, directiveE.el, {
          value: get(_this, directiveE.value),
          arg: directiveE.value,
          target: _this
        });
      }
    }
  };

  function renderMixin(Abandon) {

    // 根据render生成dom挂载到挂载点
    // 并调用watcher启动数据监听
    // 并调用events方法开启@事件注册
    // 并记录其中的组件，指令和{{}}等
    Abandon.prototype._mountComponent = function (el) {

      // 获取虚拟结点
      var vnode = this.render(createElement);

      // 挂载真实结点到页面
      var newEl = vnode.el;
      this.el.parentNode.replaceChild(newEl, this.el);
      this.el = newEl;

      // 挂载好指令等需要update的时候维护的数据
      this.$directiveE = vnode.directive;
      this.$textBindE = vnode.textBind;

      // 第一次主动更新{{}}的值
      refurbishTextBind(this, this.$textBindE);

      // 指令inserted
      renderDirective(this, this.$directiveE, 'inserted');

      // 启动数据监听
      watcher(this);

      // 绑定事件
      for (var i = 0; i < vnode.event.length; i++) {
        this._bind(vnode.event[i].el, vnode.event[i].name.replace(/^@/, ''), vnode.event[i].value);
      }

      // 如果最外层就是组件
      if (vnode.tagName && /^ui\-/.test(vnode.tagName)) {
        vnode.component = [{
          el: vnode.el,
          tagName: vnode.tagName,
          attrs: vnode.attrs
        }];
      }

      // 建立子组件
      for (var _i5 = 0; _i5 < vnode.component.length; _i5++) {

        // 获取我们注册的组件
        var component = this.$component[vnode.component[_i5].tagName.replace(/^ui\-/, "")];

        // 如果组件未定义
        if (!component) {
          throw new Error('The component is not registered:' + vnode.component[_i5].tagName);
        }

        // 设置挂载点
        component.el = vnode.component[_i5].el;

        // 设置props
        if (Array.isArray(component.props)) {
          var props = {};
          for (var _i6 = 0; _i6 < component.props.length; _i6++) {
            set(props, component.props[_i6], get(vnode.component[_i6].attrs, component.props[_i6]));
          }
          component.props = props;
        }

        var newThis = this._new(component);

        // 通过$pid把组件之间的父子关系挂起来，方便后期数据传递
        newThis.$pid = this.$uid;
      }
    };

    // 第一次或数据改变的时候，更新页面
    Abandon.prototype._updateComponent = function () {

      // 更新{{}}的值
      refurbishTextBind(this, this.$textBindE);

      // 指令update
      renderDirective(this, this.$directiveE, 'update');
    };
  }
  /**
   * 根据字符串模板生成render函数
   * @param {string} template 字符串模板
   * @return {function} render函数
   */
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

  /**
   * =========================================
   * Abandon对象
   */

  function Abandon(options) {
    if (!(this instanceof Abandon)) {
      throw new Error('Abandon is a constructor and should be called with the `new` keyword');
    }

    this._lifecycle(options.beforeCreate);

    // 初始化对象
    this._init(options);

    this._lifecycle('created');

    // 如果没有设置挂载点
    // 表示该组件不挂载
    // 不挂载的话，render或template也不会去解析
    // 或许可以在一定阶段以后，在主动去挂载，这样有益于提高效率
    if (isElement(this.el)) {
      this._lifecycle('beforeMount');

      // 挂载组件到页面
      this._mount(this.el);

      this._lifecycle('mounted');
    }
  }

  /**
   * 下面是混入几大核心功能的处理方法
   */
  initMixin(Abandon); // 初始化对象
  eventsMixin(Abandon); // 处理事件相关
  lifecycleMixin(Abandon); // 和组件的生命周期相关调用
  renderMixin(Abandon); // 组件渲染或更新相关

  /**
   * 用于数据单向绑定
   * =========================================
   * v-bind="express"
   */

  var vBind = {
    inserted: function inserted(el, binding) {
      el.value = el.textContent = binding.value;
    },
    update: function update(el, binding) {
      el.value = el.textContent = binding.value;
    }
  };

  /**
   * 用于数据双向绑定
   * =========================================
   * v-model="express"
   */

  var vModel = {
    inserted: function inserted(el, binding) {
      el.value = binding.value;
      bind(el, 'input', function () {
        set(binding.target, binding.arg, el.value);
      });
    },
    update: function update(el, binding) {
      el.value = binding.value;
    }
  };

  var uiComponent = {
    template: "<div>动态组件开发中</div>",
    created: function created() {}
  };

  var uiRouter = {
    template: "<div>路由开发中</div>",
    created: function created() {}
  };

  /**
   * 备注：除非特殊情况，_开头的表示内置方法，$开头的表示内置资源
   * =========================================
   * 整合全部资源，对外暴露调用接口
   */

  // 挂载全局方法
  initGlobalAPI(Abandon);

  // 挂载内置指令
  Abandon.directive("bind", vBind); // v-bind单向绑定
  Abandon.directive("model", vModel); // v-model双向绑定

  // 注册内置组件
  Abandon.component("component", uiComponent); // 动态组件
  Abandon.component("router", uiRouter); // 路由

  // 把组件挂载到页面中去
  Abandon.prototype._mount = function (el) {

    if (!isFunction(this.render)) {

      var template = this.template;

      // 如果template没有设置或设置的不是字符串
      if (!template || !isString(template)) {

        // 直接选择el
        template = outHTML(el);
      }

      // 根据template生成render函数
      this.render = createRenderFactroy(template);
    }

    // 一切准备好了以后，正式挂载
    this._mountComponent(el);
  };

  // 根据运行环境，导出接口
  if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
    module.exports = Abandon;
  } else {
    window.Abandon = Abandon;
  }
})();