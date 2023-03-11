<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useDjStore } from '@/stores/DjStore.js';

const store = useDjStore();
const props = defineProps(['id']);
const route = useRoute();

const isContact = computed(() => {
  return route.path.endsWith('/contact');
});
const selectedDj = store.djs.find((dj) => dj.id === props.id);

const artistName = computed(() => {
  return selectedDj.artistName;
});

const rate = computed(() => {
  return selectedDj.hourlyRate;
});

const genres = computed(() => {
  return selectedDj.genres;
});

const djContactLink = computed(() => {
  return `${route.path}/contact`;
});
</script>

<template>
  <section>
    <base-card>
      <h2 class="text-2xl font-bold">{{ artistName }}</h2>
      <h3 class="text-xl font-bold">{{ `$${rate}/hour` }}</h3>
    </base-card>
  </section>
  <section>
    <base-card>
      <header>
        <h2 class="text-xl font-bold">Interested? Reach out now!</h2>
        <base-button
          v-if="!isContact"
          link
          class="mt-2 block"
          :to="djContactLink"
          color="yellow"
          >Contact</base-button
        >
      </header>
      <Router-View />
    </base-card>
  </section>
  <section>
    <base-card>
      <div>
        <base-badge
          v-for="genre in genres"
          :key="genre"
          :type="genre"
          :title="genre"
        ></base-badge>
      </div>
      <p>{{ selectedDj.description }}</p>
    </base-card>
  </section>
</template>
