import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export const useDjStore = defineStore('djs', () => {
  // TODO proper authentication
  const userId = ref(`d${Math.floor(Math.random() * 1000)}`);
  const djs = ref([]);
  const isDj = computed(() => {
    return djs.value.some((dj) => dj.id === userId.value);
  });
  const isLoading = ref(false);
  const error = ref(null);

  async function registerDj(data) {
    try {
      const djData = {
        artistName: data.artistName,
        genres: data.genres,
        description: data.description,
        hourlyRate: data.hourlyRate,
      };
      await fetch(
        `https://dj-finder-f8faf-default-rtdb.firebaseio.com/djs/${userId.value}.json`,
        {
          method: 'PUT',
          body: JSON.stringify(djData),
        }
      );
    } catch (e) {
      error.value = 'Failed to fetch data.';
    }
  }

  async function getDjData() {
    try {
      isLoading.value = true;
      const response = await fetch(
        `https://dj-finder-f8faf-default-rtdb.firebaseio.com/djs.json`
      );
      const responseData = await response.json();
      isLoading.value = false;
      const updatedDjs = [];
      for (const key in responseData) {
        const dj = {
          id: key,
          artistName: responseData[key].artistName,
          genres: responseData[key].genres,
          description: responseData[key].description,
          hourlyRate: responseData[key].hourlyRate,
        };
        updatedDjs.push(dj);
      }
      djs.value = updatedDjs;
    } catch (e) {
      error.value = e.message || 'Failed to fetch data.';
    }
  }

  const hasDjs = computed(() => {
    return !isLoading.value && djs.value.length > 0;
  });

  return { djs, registerDj, userId, hasDjs, isDj, getDjData, isLoading, error };
});

export default {};
