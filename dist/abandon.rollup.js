/*!
* abandon v0.1.4-alpha
* (c) 2007-2019 心叶 git+https://github.com/yelloxing/abandon.git
* License: MIT
*/

(function () {
    'use strict';

    const toString = Object.prototype.toString;

    /**
     * 获取一个值的类型字符串[object type]
     *
     * @private
     * @param {*} value 需要返回类型的值
     * @returns {string} 返回类型字符串
     */
    function getType (value) {
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
    function isObject (value) {
        const type = typeof value;
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
    function isFunction (value) {
        if (!isObject(value)) {
            return false;
        }

        const type = getType(value);
        return type === '[object Function]' || type === '[object AsyncFunction]' ||
            type === '[object GeneratorFunction]' || type === '[object Proxy]';
    }

    let uid = 0;

    function initMixin(Abandon) {

      // 对象初始化
      Abandon.prototype._init = function (options) {

        const abandon = this;
        abandon._uid = uid++;
        options = options || {};

        for (let key in options) {
          abandon[key] = options[key];
        }

        // 数据预处理
        if (isFunction(abandon.data)) {
          abandon.data = abandon.data.call(abandon);
        }

      };

    }

    function Watcher (abandon, update) {
      update.call(abandon);
    }

    function outHTML(el) {
      if (el.outerHTML) {
        return el.outerHTML;
      } else {
        const container = document.createElement('div');
        container.appendChild(el.cloneNode(true));
        return container.innerHTML;
      }
    }
    function toNode(template) {
      const container = document.createElement('div');
      container.innerHTML = template;
      return container.firstElementChild;
    }

    /**
     * 判断一个值是不是symbol。
     *
     * @since V0.1.2
     * @public
     * @param {*} value 需要判断类型的值
     * @returns {boolean} 如果是symbol返回true，否则返回false
     */
    function isSymbol (value) {
        const type = typeof value;
        return type === 'symbol' || (type === 'object' && value !== null && getType(value) === '[object Symbol]');
    }

    /**
     * 判断是不是一个对象上的属性
     *
     * @private
     * @param {Array|string} path 属性或路径
     * @param {Object} object 操作的对象
     * @returns {boolean} 如果是返回true，否则返回false
     */

    function isKey (value, object) {

        if (Array.isArray(value)) {
            return false;
        }

        const type = typeof value;
        if (type == 'number' || type == 'boolean' || value == null || isSymbol(value)) {
            return true;
        }

        return (object !== null && value in Object(object)) || /^\w*$/.test(value);
    }

    /**
     * 把字符串路径变成简单的数组
     *
     * @private
     * @param {string} value 需要解析的路径字符串
     * @returns {Array} 返回属性数组
     */
    function stringToPath (value) {
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
    function castPath (value, object) {
        if (Array.isArray(value)) {
            return value;
        }
        return isKey(value, object) ? [value] : stringToPath(value);

    }

    const INFINITY = 1 / 0;

    /**
     * 如果value不是字符串或者symbol，就变成字符串
     *
     * @private
     * @param {*} value 需要检查的值
     * @returns {string|symbol} 返回key
     */
    function toKey (value) {
        if (typeof value === 'string' || isSymbol(value)) {
            return value;
        }

        const result = `${value}`;
        return (result === '0' && (1 / value) === -INFINITY) ? "-0" : result;
    }

    /**
     * 获取一个对象属性值的基础方法，没有默认值。
     *
     * @private
     * @param {Object} object 操作的对象
     * @param {Array|string} path 属性或路径
     * @returns {*} 返回设置的结果
     */
    function baseGet (object, path) {

        // 统一把路径变成['a','b','c',...]这种
        path = castPath(path, object);

        let index = 0;
        for (; index < path.length && object !== null; index++) {
            object = object[toKey(path[index])];
        }

        return (index && index === path.length) ? object : undefined;
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

    function get (object, path, defaultValue) {
        let result = object == null ? undefined : baseGet(object, path);
        return result === undefined ? defaultValue : result;
    }

    function lifecycleMixin(Abandon) {

      Abandon.prototype._update = function () {
        if (isFunction(this.beforeUpdate)) {
          this.beforeUpdate.call(this);
        }

        // 检查全部的{{}}
        let _this = this;
        this.template = this.template.replace(/{{[^}]+}}/g, function (oldValue) {
          let value = get(_this, oldValue.replace('{{', '').replace('}}', ""));
          return value;
        });

        let newEl = toNode(this.template);
        this.el.parentNode.replaceChild(newEl, this.el);

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
     * 判断一个值是不是一个朴素的'对象'
     *
     * @private
     * @param {*} value 需要判断类型的值
     * @returns {boolean} 如果是朴素的'对象'返回true，否则返回false
     */

    function isPlainObject (value) {
        if (value === null || typeof value !== 'object' || getType(value) != '[object Object]') {
            return false;
        }

        // 如果原型为null
        if (Object.getPrototypeOf(value) === null) {
            return true;
        }

        let proto = value;
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
    function isElement (value) {
        return value !== null && typeof value === 'object' &&
            (value.nodeType === 1 || value.nodeType === 9 || value.nodeType === 11) &&
            !isPlainObject(value);
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

    /**
     * 判断一个值是不是String。
     *
     * @since V0.1.2
     * @public
     * @param {*} value 需要判断类型的值
     * @returns {boolean} 如果是String返回true，否则返回false
     */
    function isString (value) {
        const type = typeof value;
        return type === 'string' || (type === 'object' && value != null && !Array.isArray(value) && getType(value) === '[object String]');
    }

    Abandon.prototype.$mount = function (el) {

      // 警告：本版本不采用render方式

      // 如果template没有设置或设置的不是字符串
      if (!this.template || !isString(this.template)) {

        // 直接选择el
        this.template = outHTML(el);
      }

      // 一切准备好了以后，挂载
      mountComponent(this);
    };

    if (typeof module === "object" && typeof module.exports === "object") {
      module.exports = Abandon;
    } else {
      window.Abandon = Abandon;
    }

}());
