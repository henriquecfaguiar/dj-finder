<script setup>
import DjForm from '../../components/djs/DjForm.vue';
import { useDjStore } from '@/stores/DjStore.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useDjStore();

function saveData(data) {
  store.registerDj(data);
  router.replace('/djs');
}
</script>

<template>
  <div>
    <base-card>
      <h2 class="mb-10 text-2xl font-bold">Register as a DJ now!</h2>
      <DjForm @save-data="saveData" />
    </base-card>
  </div>
</template>
