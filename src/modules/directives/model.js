/**
 * 用于数据双向绑定
 * =========================================
 * v-model="express"
 */

import { bind } from '../../utils/tool';
import set from '@yelloxing/core.js/set';

export default {
  inserted: function (el, binding) {
    el.value = binding.value;
    bind(el, 'input', () => {
      set(binding.target, binding.arg, el.value);
    });
  },
  update: function (el, binding) {
    el.value = binding.value;
  }
};