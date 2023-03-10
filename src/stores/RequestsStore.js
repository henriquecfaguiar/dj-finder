import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useRequestsStore = defineStore('requests', () => {
  const requests = ref([]);

  function storeRequest(data) {
    requests.value.push(data);
  }

  return { requests, storeRequest };
});

export default {};
