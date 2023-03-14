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
</script>

<template>
  <span class="badge" :class="props.type">{{ text }}</span>
</template>

<style scoped>
.badge {
  @apply rounded-full px-4 py-1 text-center text-sm text-white;
}

.hip-hop {
  @apply bg-red-600;
}

.pop {
  @apply bg-sky-600;
}

.trap {
  @apply bg-amber-600;
}
.house {
  @apply bg-purple-600;
}
</style>
