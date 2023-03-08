<script setup>
import { ref } from 'vue';

const artistName = ref('');
const rate = ref(null);
const description = ref('');
const genres = ref([]);

function submitForm() {
  const formData = {
    artistName: artistName.value,
    hourlyRate: rate.value,
    description: description.value,
    genres: genres.value,
  };

  console.log(formData);
}
</script>

<template>
  <form @submit.prevent="submitForm" class="space-y-4">
    <!-- Artist Name -->
    <div class="form-control">
      <label class="label-titles" for="artist-name">Artist Name</label>
      <input
        class="custom-inputs"
        type="text"
        id="artist-name"
        v-model.trim="artistName"
      />
    </div>
    <!-- Hourly Rate -->
    <div class="form-control">
      <label class="label-titles" for="hourly-rate">Hourly Rate</label>
      <input
        class="custom-inputs"
        type="number"
        id="hourly-rate"
        v-model.number="rate"
      />
    </div>
    <!-- Description -->
    <div class="form-control flex items-center">
      <label class="label-titles" for="description">Description</label>
      <textarea
        class="custom-inputs"
        id="description"
        rows="5"
        v-model.trim="description"
      ></textarea>
    </div>
    <div>
      <label class="label-titles" for="genres">Genres of Expertise</label>
      <div class="mt-2 flex flex-col">
        <span class="checkbox">
          <input type="checkbox" id="house" value="house" v-model="genres" />
          <label for="house">House</label>
        </span>
        <span class="checkbox">
          <input type="checkbox" id="trap" value="trap" v-model="genres" />
          <label for="trap">Trap</label>
        </span>
        <span class="checkbox">
          <input
            type="checkbox"
            id="hip-hop"
            value="hip-hop"
            v-model="genres"
          />
          <label for="hip-hop">Hip-hop</label>
        </span>
        <span class="checkbox">
          <input type="checkbox" id="pop" value="pop" v-model="genres" />
          <label for="pop">Pop</label>
        </span>
      </div>
    </div>
    <base-button color="yellow">Register</base-button>
  </form>
</template>

<style scoped>
.form-control {
  @apply flex flex-col items-start space-y-2;
}

.checkbox {
  @apply space-x-2;
}

.custom-inputs {
  @apply w-full border-2 border-slate-500;
}

.label-titles {
  @apply font-bold;
}
</style>
