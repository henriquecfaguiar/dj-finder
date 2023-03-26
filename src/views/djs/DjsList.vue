<script setup>
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useDjStore } from '@/stores/DjStore.js';
import { useAuthStore } from '../../stores/AuthStore';
import DjItem from '../../components/djs/DjItem.vue';
import DjFilter from '../../components/djs/DjFilter.vue';

const djStore = useDjStore();
const authStore = useAuthStore();
const { isLoggedIn } = storeToRefs(authStore);
const { djs, hasDjs, isDj, isLoading, error } = storeToRefs(djStore);
const { getDjData } = djStore;
const activeFilters = ref({
  house: true,
  'hip-hop': true,
  pop: true,
  trap: true,
});

function setFilter(updatedFilters) {
  activeFilters.value = updatedFilters;
}

function handleError() {
  error.value = null;
}

const filteredDjs = computed(() => {
  return djs.value.filter((dj) => {
    return dj.genres.some((djGenre) => activeFilters.value[djGenre]);
  });
});
onMounted(() => {
  if (hasDjs.value) {
    return;
  } else {
    getDjData();
  }
});
</script>

<template>
  <div>
    <base-dialog :show="!!error" title="An error ocurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <DjFilter @change-filter="setFilter" />
    </section>
    <base-card>
      <section>
        <div class="controls mb-4 flex items-center justify-between">
          <base-button class="py-[10px]" color="green" @click="getDjData()"
            >Refresh</base-button
          >
          <p v-if="!isLoggedIn">
            <Router-Link
              to="/auth"
              class="text-amber-900 underline hover:opacity-80"
              >Login</Router-Link
            >
            to register as a DJ
          </p>
          <base-button
            v-if="!isDj && !isLoading && isLoggedIn"
            link
            color="yellow"
            to="/register"
            >Register as DJ</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul class="space-y-6" v-else-if="hasDjs">
          <DjItem
            v-for="dj in filteredDjs"
            :key="dj.id"
            :id="dj.id"
            :artist-name="dj.artistName"
            :rate="dj.hourlyRate"
            :genres="dj.genres"
          />
        </ul>
        <p class="text-lg" v-else>No DJ's found.</p>
      </section>
    </base-card>
  </div>
</template>
