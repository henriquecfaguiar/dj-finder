<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  artistName: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  genres: {
    type: Array,
    required: true,
  },
});

const route = useRoute();

const djContactLink = computed(() => {
  return `${route.path}/${props.id}/contact`;
});

const djDetailsLink = computed(() => {
  return `${route.path}/${props.id}`;
});
</script>

<template>
  <li
    class="rounded-lg border-2 border-slate-600 bg-gradient-to-r from-slate-600 to-slate-700 py-4 px-6 text-white shadow-md shadow-slate-700"
  >
    <h3 class="text-xl">{{ artistName }}</h3>
    <h4 class="font-bold text-yellow-300">{{ `$${rate}/hour` }}</h4>
    <div>
      <span v-for="genre in genres" :key="genre">{{ genre }}</span>
    </div>
    <div class="actions flex justify-end">
      <RouterLink :to="djContactLink">Contact</RouterLink>
      <RouterLink :to="djDetailsLink">View Details</RouterLink>
    </div>
  </li>
</template>

<style scoped>
a:active,
a:hover {
  @apply text-yellow-300 duration-200;
}
</style>
