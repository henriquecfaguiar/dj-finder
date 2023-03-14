<script setup>
import { ref } from 'vue';

const emits = defineEmits(['change-filter']);
const filters = ref({
  house: true,
  'hip-hop': true,
  pop: true,
  trap: true,
});

function setFilter(event) {
  const inputId = event.target.id;
  const isActive = event.target.checked;
  const updatedFilters = {
    ...filters.value,
    [inputId]: isActive,
  };
  filters.value = updatedFilters;
  emits('change-filter', updatedFilters);
}
</script>

<template>
  <base-card>
    <h2 class="text-center text-2xl font-bold md:text-left">
      What genres are you looking for?
    </h2>
    <div class="flex justify-around gap-2 md:justify-start">
      <div class="flex flex-col gap-2 md:flex-row">
        <span class="space-x-1">
          <input type="checkbox" id="house" checked @change="setFilter" />
          <label for="house">House</label>
        </span>
        <span class="space-x-1">
          <input type="checkbox" id="hip-hop" checked @change="setFilter" />
          <label for="hip-hop">Hip-Hop</label>
        </span>
      </div>
      <div class="flex flex-col gap-2 md:flex-row">
        <span class="space-x-1">
          <input type="checkbox" id="pop" checked @change="setFilter" />
          <label for="pop">Pop</label>
        </span>
        <span class="space-x-1">
          <input type="checkbox" id="trap" checked @change="setFilter" />
          <label for="trap">Trap</label>
        </span>
      </div>
    </div>
  </base-card>
</template>
