<script setup>
import { computed } from 'vue';
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const text = computed(() => {
  return props.title.toUpperCase();
});

const type = computed(() => {
  switch (props.type) {
    case 'hip-hop':
      return 'bg-red-600';
    case 'pop':
      return 'bg-sky-600';
    case 'trap':
      return 'bg-amber-600';
    case 'house':
      return 'bg-purple-600';
    default:
      return 'black';
  }
});
</script>

<template>
  <span
    class="rounded-full px-4 py-1 text-center text-sm text-white"
    :class="type"
    >{{ text }}</span
  >
</template>
