import Abandon from 'abandon';

import page1 from './page1';
import page2 from './page2';

const pages = {
  page1,
  page2
};

Abandon.component('app', {
  template: `<div>
    <h2>abandon 演示用例</h2>
    <ul>
      <li @click='navTo(page1)'>用例1</li>
      <li @click='navTo(page2)'>用例2</li>
    </ul>
    <div>
      <component v-bind:is="data.currentPage" />
    </div>
  </div>`,
  data() {
    return {
      currentPage: page1
    };
  },
  methods: {
    navTo(flag) {
      this.data.currentPage = pages[flag];
    }
  }
});