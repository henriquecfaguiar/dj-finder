<script setup>
import { useDjsStore } from '@/stores/djs.js';
import DjItem from '../../components/djs/DjItem.vue';

const store = useDjsStore();
const djsList = store.djs;
const hasDjs = store.hasDjs;
</script>

<template>
  <section>Filter</section>
  <base-card>
    <section>
      <div class="controls flex justify-between">
        <button>Refresh</button>
        <RouterLink to="/register">Register as DJ</RouterLink>
      </div>
      <ul class="space-y-6" v-if="hasDjs">
        <DjItem
          v-for="dj in djsList"
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
