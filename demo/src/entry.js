import Abandon from 'abandon';

// 兼容文件
import 'promise-polyfill/src/polyfill';

// 引入基础样式
import '@yelloxing/normalize.css';

// 引入全局组件
import './components/ui-demo';

//根对象
window.vm = new Abandon({

  //挂载点
  el: document.getElementById('root'),

  // 数据
  data() {
    return {
      message: "Hello Abandon!"
    };
  },

  methods: {
    doIt() {
      this.data.message = new Date().valueOf();
    }
  },

  // render: function (createElement) {
  //   return createElement('span', {}, [
  //     "{{data.message}}-{{data.message}}",
  //     createElement("i", {
  //       "class": "info",
  //     }, ["={{data.message}}="])
  //   ]);
  // },

  // 模板字符串
  template: `<div>
   <h2>
     1.单向绑定
   </h2>
   {{data.message}}
   |
   <span v-bind='data.message'></span>
   <h2>
     2.事件
   </h2>
   <input type="button" value="单击" @click='doIt()'>
   |
   <input type="button" value="鼠标进入" @mouseenter='doIt()'>
   <h2>
     3.双向绑定<ui-demo></ui-demo>
   </h2>
   <input type="text" v-model='data.message'>

   <!-- 4.组件 -->
   <ui-demo></ui-demo>
 </div>`,

  // 生命周期
  beforeCreate() {
    console.log("beforeCreate");
    console.warn(this);
  },
  created() {
    console.log("created");
    console.warn(this);
  },
  beforeMount() {
    console.log("beforeMount");
    console.warn(this);
  },
  mounted() {
    console.log("mounted");
    console.warn(this.data.message);
  },
  beforeUpdate() {
    console.log("beforeUpdate");
    console.warn(this.data.message);
  },
  updated() {
    console.log("updated");
    console.warn(this.data.message);
  },
  beforeDestroy() {
    console.log("beforeDestroy");
    console.warn(this);
  },
  destroyed() {
    console.log("destroyed");
    console.warn(this);
  }
});
