import Abandon from 'abandon';
Abandon.component('app', {
  template: `<ul>

    <!-- 主界面 -->
    <li class='main-view'>
        <ui-router></ui-router>
    </li>

    <!-- 弹框界面 -->
    <li class='dialog-view'>
        <div class="view shade">
            <!-- 统一遮罩 -->
        </div>
        <div class="view">
          <ui-component></ui-component>
        </div>
    </li>

  </ul>`,
  data() {
    return {

    };
  },
  created() {
    console.error('温馨提示：项目新功能研发中，敬请期待（怕麻烦，没有新建dev分支，我们会尽力早日完成升级，预计2019年11月5日前完成）');
  }
});