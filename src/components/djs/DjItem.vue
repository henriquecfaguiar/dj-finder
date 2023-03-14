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
    class="flex items-center justify-between rounded-lg border-2 border-slate-600 bg-gradient-to-r from-slate-600 to-slate-700 p-4 text-white shadow-md shadow-slate-700 md:p-6"
  >
    <div class="space-y-1">
      <h3 class="text-xl">{{ artistName }}</h3>
      <h4 class="font-bold text-yellow-300">{{ `$${rate}/hour` }}</h4>
      <div class="flex flex-col gap-2 md:flex-row">
        <base-badge
          v-for="genre in genres"
          :key="genre"
          :type="genre"
          :title="genre"
        ></base-badge>
      </div>
    </div>
    <div class="actions flex flex-col gap-4">
      <RouterLink class="item-link" :to="djContactLink">Contact</RouterLink>
      <RouterLink class="item-link" :to="djDetailsLink"
        >View Details</RouterLink
      >
    </div>
  </li>
</template>

<style scoped>
a:active,
a:hover {
  @apply text-yellow-300 duration-200;
}

.item-link {
  @apply w-28 rounded-md border-2 border-yellow-300 bg-yellow-300 p-2 text-center text-xs text-slate-900 shadow-lg duration-200 hover:bg-transparent hover:text-yellow-300  md:w-44 md:text-sm;
}
</style>
