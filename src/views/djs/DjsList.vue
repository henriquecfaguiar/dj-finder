<script setup>
import { useDjsStore } from '@/stores/djs.js';

const store = useDjsStore();
const djsList = store.djs;
const hasDjs = store.hasDjs;
</script>

<template>
  <section>Filter</section>
  <section>
    <div class="controls">
      <button>Refresh</button>
      <RouterLink to="/register">Register as DJ</RouterLink>
    </div>
    <ul v-if="hasDjs">
      <li v-for="dj in djsList" :key="dj.id">
        {{ dj.artistName }}
      </li>
    </ul>
    <p v-else>No DJ's found.</p>
  </section>
</template>
