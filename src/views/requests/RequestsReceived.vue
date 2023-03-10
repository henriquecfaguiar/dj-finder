<script setup>
import RequestItem from '../../components/requests/RequestItem.vue';
import { computed } from 'vue';
import { useDjStore } from '../../stores/DjStore';
import { useRequestsStore } from '../../stores/RequestsStore';

const djStore = useDjStore();
const requestsStore = useRequestsStore();
const unfilteredRequests = requestsStore.requests;
const requests = unfilteredRequests.filter(
  (request) => request.djId === djStore.userId
);
const isRequestsEmpty = computed(() => {
  return !requests.length;
});
</script>

<template>
  <section>
    <base-card>
      <header>
        <h2 class="text-2xl font-bold">Requests Received</h2>
      </header>
      <ul class="space-y-6" v-if="!isRequestsEmpty">
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
</template>
