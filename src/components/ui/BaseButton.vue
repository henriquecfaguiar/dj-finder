<script setup>
import { computed } from 'vue';

const props = defineProps({
  color: {
    type: String,
    required: false,
    default: null,
  },
  link: {
    type: Boolean,
    required: false,
    default: false,
  },
  to: {
    type: String,
    required: false,
    default: '/',
  },
});

const buttonColor = computed(() => {
  switch (props.color) {
    case 'yellow':
      return {
        'bg-yellow-300': true,
        'text-slate-900': true,
        'hover:bg-yellow-400': true,
      };
    case 'green':
      return {
        'bg-green-400': true,
        'text-white': true,
        'hover:bg-green-500': true,
      };
    case 'flat-yellow':
      return {
        'bg-white': true,
        'text-slate-900': true,
        'border-2': true,
        'border-yellow-300': true,
      };
    default:
      return {
        'bg-pink-500': true,
      };
  }
});
</script>

<template>
  <button
    class="w-32 rounded-full px-6 py-2 text-center duration-150 ease-linear hover:scale-105"
    v-if="!props.link"
    :class="buttonColor"
  >
    <slot></slot>
  </button>
  <RouterLink
    class="w-fit rounded-full px-6 py-2 text-center duration-150 ease-linear hover:scale-105"
    v-else
    :to="props.to"
    :class="buttonColor"
  >
    <slot></slot>
  </RouterLink>
</template>
