<script setup>
import { ref } from 'vue';

const emits = defineEmits(['save-data']);
const artistName = ref({
  val: '',
  isValid: true,
});
const rate = ref({
  val: null,
  isValid: true,
});
const description = ref({
  val: '',
  isValid: true,
});
const genres = ref({
  val: [],
  isValid: true,
});
const formIsValid = ref(true);

function validateForm() {
  formIsValid.value = true;
  if (artistName.value.val === '') {
    artistName.value.isValid = false;
    formIsValid.value = false;
  }
  if (!rate.value.val || rate.value.val < 0) {
    rate.value.isValid = false;
    formIsValid.value = false;
  }
  if (description.value.val === '') {
    description.value.isValid = false;
    formIsValid.value = false;
  }
  if (genres.value.val.length === 0) {
    genres.value.isValid = false;
    formIsValid.value = false;
  }
}

function submitForm() {
  validateForm();

  if (formIsValid.value === false) return;

  const formData = {
    artistName: artistName.value.val,
    hourlyRate: rate.value.val,
    description: description.value.val,
    genres: genres.value.val,
  };
  emits('save-data', formData);
}

function isInputValid(input) {
  input.isValid = true;
}
</script>

<template>
  <form @submit.prevent="submitForm" class="space-y-4">
    <!-- Artist Name -->
    <div class="flex flex-col items-start space-y-2">
      <label
        class="font-bold"
        :class="{ 'invalid-label': !artistName.isValid }"
        for="artist-name"
        >Artist Name</label
      >
      <input
        class="w-full border-2 border-slate-500"
        :class="{ 'invalid-input': !artistName.isValid }"
        type="text"
        id="artist-name"
        v-model.trim="artistName.val"
        @blur="isInputValid(artistName)"
      />
      <p class="text-sm" v-if="!artistName.isValid">
        Artist Name must not be empty.
      </p>
    </div>
    <!-- Hourly Rate -->
    <div class="flex flex-col items-start space-y-2">
      <label
        class="font-bold"
        :class="{ 'invalid-label': !rate.isValid }"
        for="hourly-rate"
        >Hourly Rate</label
      >
      <input
        class="w-full border-2 border-slate-500"
        :class="{ 'invalid-input': !rate.isValid }"
        type="number"
        id="hourly-rate"
        v-model.number="rate.val"
        @blur="isInputValid(rate)"
      />
      <p class="text-sm" v-if="!rate.isValid">
        Hourly Rate must be greater than 0.
      </p>
    </div>
    <!-- Description -->
    <div class="flex flex-col items-start space-y-2">
      <label
        class="font-bold"
        :class="{ 'invalid-label': !description.isValid }"
        for="description"
        >Description</label
      >
      <textarea
        class="w-full border-2 border-slate-500"
        :class="{ 'invalid-input': !description.isValid }"
        id="description"
        rows="5"
        v-model.trim="description.val"
        @blur="isInputValid(description)"
      ></textarea>
      <p class="text-sm" v-if="!description.isValid">
        Description must not be empty.
      </p>
    </div>
    <!-- Genres -->
    <div>
      <label
        class="font-bold"
        :class="{ 'invalid-label': !genres.isValid }"
        for="genres"
        >Genres of Expertise</label
      >
      <p class="text-sm" v-if="!genres.isValid">
        You must choose at least one genre.
      </p>
      <div class="mt-2 flex flex-col">
        <span class="space-x-2">
          <input
            type="checkbox"
            id="house"
            value="house"
            v-model="genres.val"
            @change="isInputValid(genres)"
          />
          <label for="house">House</label>
        </span>
        <span class="space-x-2">
          <input
            type="checkbox"
            id="trap"
            value="trap"
            v-model="genres.val"
            @change="isInputValid(genres)"
          />
          <label for="trap">Trap</label>
        </span>
        <span class="space-x-2">
          <input
            type="checkbox"
            id="hip-hop"
            value="hip-hop"
            v-model="genres.val"
            @change="isInputValid(genres)"
          />
          <label for="hip-hop">Hip-hop</label>
        </span>
        <span class="space-x-2">
          <input
            type="checkbox"
            id="pop"
            value="pop"
            v-model="genres.val"
            @change="isInputValid(genres)"
          />
          <label for="pop">Pop</label>
        </span>
      </div>
    </div>
    <p v-if="!formIsValid" class="text-sm text-red-500">
      Please fix all the errors above and submit again
    </p>
    <base-button color="yellow">Register</base-button>
  </form>
</template>

<style scoped>
.invalid-label {
  @apply text-red-500;
}
.invalid-input {
  @apply border-red-500;
}
</style>
