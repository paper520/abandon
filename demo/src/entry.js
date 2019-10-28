import Abandon from 'abandon';

// 兼容文件
import 'promise-polyfill/src/polyfill';

// 引入基础样式
import '@yelloxing/normalize.css';

// 引入主页面
import './page/App';

// 添加水印(懒加载)
let watermark = resolve => require(['./service/watermark'], resolve);
new Promise(resolve => watermark(resolve)).then(callback => callback.default("Abandon 用例"));

//根对象
window.vm = new Abandon({

  //挂载点
  el: document.getElementById('root'),

  // 配置启动方法
  render: createElement => createElement('ui-app')

});
