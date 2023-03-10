<script setup>
import { computed } from 'vue';
const props = defineProps(['email', 'message']);
const emailLink = computed(() => {
  return `mailto:${props.email}`;
});
</script>

<template>
  <li
    class="space-y-4 rounded-lg border-2 border-slate-600 bg-gradient-to-r from-slate-600 to-slate-700 p-4 text-white shadow-md shadow-slate-700"
  >
    <a
      class="cursor-pointer text-yellow-300 underline hover:opacity-80"
      :href="emailLink"
      >{{ props.email }}</a
    >
    <p>{{ props.message }}</p>
  </li>
</template>
