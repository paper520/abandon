/**
 * 用于数据单向绑定
 * =========================================
 * v-bind="express"
 */

export default {
  inserted: function (el, binding) {
    el.value = el.textContent = binding.value;
  },
  update: function (el, binding) {
    el.value = el.textContent = binding.value;
  }
};