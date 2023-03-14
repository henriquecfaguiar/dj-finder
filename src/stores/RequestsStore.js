import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useAuthStore } from './AuthStore';

export const useRequestsStore = defineStore('requests', () => {
  const requests = ref([]);
  const isLoading = ref(false);
  const store = useAuthStore();
  const error = ref(null);

  async function storeRequest(data) {
    try {
      const requestData = {
        email: data.email,
        message: data.message,
      };
      await fetch(
        `https://dj-finder-f8faf-default-rtdb.firebaseio.com/requests/${data.djId}.json`,
        {
          method: 'POST',
          body: JSON.stringify(requestData),
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function getRequests() {
    try {
      isLoading.value = true;
      const response = await fetch(
        `https://dj-finder-f8faf-default-rtdb.firebaseio.com/requests/${store.userId}.json?auth=${store.token}`
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(response.status);
      }
      const updatedRequests = [];
      for (const key in responseData) {
        const request = {
          id: key,
          email: responseData[key].email,
          message: responseData[key].message,
        };
        updatedRequests.push(request);
      }
      requests.value = updatedRequests;
    } catch (err) {
      error.value = 'Failed to load data.' + err;
    } finally {
      isLoading.value = false;
    }
  }
  const hasRequests = computed(() => {
    return !isLoading.value && requests.value.length > 0;
  });

  return { requests, storeRequest, getRequests, isLoading, hasRequests, error };
});

export default {};
