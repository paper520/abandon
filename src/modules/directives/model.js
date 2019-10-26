import { bind } from '../../utils/tool';
import set from '@yelloxing/core.js/set';

export default {
  bind: function (el, binding) {
    el.value = binding.value;
    bind(el, 'input', () => {
      set(binding.target, binding.arg, el.value);
    });
  },
  update: function (el, binding) {
    el.value = binding.value;
  }
};