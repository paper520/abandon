import Abandon from 'abandon';

import page1 from './page1'; Abandon.component('page1', page1);
import page2 from './page2'; Abandon.component('page2', page2);

Abandon.component('app', {
  template: `<div class="AppView">
    <header>
      <h2>演示用例</h2>
      <ul>
        <li @click='navTo(page1)'>简单的实例</li>
        <li @click='navTo(page2)'>内置接口</li>
      </ul>
    </header>
    <div>
      <component v-bind:is="data.currentPage" />
    </div>
  </div>`,
  data() {
    return {
      currentPage: "page1"
    };
  },
  methods: {
    navTo(flag) {
      this.data.currentPage = flag;
    }
  }
});