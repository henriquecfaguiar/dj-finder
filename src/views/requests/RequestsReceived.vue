<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRequestsStore } from '../../stores/RequestsStore';
import RequestItem from '../../components/requests/RequestItem.vue';
import BaseSpinner from '../../components/ui/BaseSpinner.vue';
const requestsStore = useRequestsStore();

const { isLoading, requests, hasRequests, error } = storeToRefs(requestsStore);
const { getRequests } = requestsStore;

function handleError() {
  error.value = null;
}

onMounted(() => {
  getRequests();
});
</script>

<template>
  <div>
    <base-dialog :show="!!error" title="An error ocurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <header>
          <h2 class="text-2xl font-bold">Requests Received</h2>
        </header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul class="space-y-6" v-else-if="hasRequests || isLoading">
          <RequestItem
            v-for="request in requests"
            :key="request.djId"
            :email="request.email"
            :message="request.message"
          />
        </ul>
        <h3 v-else>You haven't received any requests yet!</h3>
      </base-card>
    </section>
  </div>
</template>
