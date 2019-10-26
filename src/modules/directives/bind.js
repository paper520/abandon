export default {
  inserted: function (el, binding) {
    el.value = el.textContent = binding.value;
  },
  update: function (el, binding) {
    el.value = el.textContent = binding.value;
  }
};