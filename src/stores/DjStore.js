import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { useAuthStore } from './AuthStore';

export const useDjStore = defineStore('djs', () => {
  const store = useAuthStore();
  const djs = ref([]);
  const isDj = computed(() => {
    return djs.value.some((dj) => dj.id === store.userId);
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
        `https://dj-finder-f8faf-default-rtdb.firebaseio.com/djs/${store.userId}.json?auth=${store.token}`,
        {
          method: 'PUT',
          body: JSON.stringify(djData),
        }
      );
      getDjData();
    } catch (error) {
      console.log(error);
    }
  }

  async function getDjData() {
    try {
      isLoading.value = true;
      const response = await fetch(
        `https://dj-finder-f8faf-default-rtdb.firebaseio.com/djs.json`
      );
      const responseData = await response.json();
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
    } finally {
      isLoading.value = false;
    }
  }

  const hasDjs = computed(() => {
    return !isLoading.value && djs.value.length > 0;
  });

  return { djs, registerDj, hasDjs, isDj, getDjData, isLoading, error };
});

export default {};
