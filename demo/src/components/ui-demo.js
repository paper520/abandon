import Abandon from 'abandon';
Abandon.component('demo', {
  template: "<div><h2>组件用例</h2><p>{{data.message}}</p></div>",
  data() {
    return {
      message: "组件中的数据"
    };
  }
});