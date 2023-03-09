<script setup>
import { ref, computed } from 'vue';
import { useDjStore } from '@/stores/DjStore.js';
import DjItem from '../../components/djs/DjItem.vue';
import DjFilter from '../../components/djs/DjFilter.vue';

const djStore = useDjStore();
const djsList = djStore.djs;
const hasDjs = djStore.hasDjs;
const activeFilters = ref({
  house: true,
  'hip-hop': true,
  pop: true,
  trap: true,
});

function setFilter(updatedFilters) {
  activeFilters.value = updatedFilters;
}

const filteredDjs = computed(() => {
  return djsList.filter((dj) => {
    if (activeFilters.value.house && dj.genres.includes('house')) {
      return true;
    }
    if (activeFilters.value['hip-hop'] && dj.genres.includes('hip-hop')) {
      return true;
    }
    if (activeFilters.value.pop && dj.genres.includes('pop')) {
      return true;
    }
    if (activeFilters.value.trap && dj.genres.includes('trap')) {
      return true;
    }
    return false;
  });
});
</script>

<template>
  <section>
    <DjFilter @change-filter="setFilter" />
  </section>
  <base-card>
    <section>
      <div class="controls mb-4 flex justify-between">
        <base-button color="green">Refresh</base-button>
        <base-button v-if="!djStore.isDj" link color="yellow" to="/register"
          >Register as DJ</base-button
        >
      </div>
      <ul class="space-y-6" v-if="hasDjs">
        <DjItem
          v-for="dj in filteredDjs"
          :key="dj.id"
          :id="dj.id"
          :artist-name="dj.artistName"
          :rate="dj.hourlyRate"
          :genres="dj.genres"
        />
      </ul>
      <p v-else>No DJ's found.</p>
    </section>
  </base-card>
</template>
