<script setup>
import { useRequestsStore } from '../../stores/RequestsStore';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';

const requestsStore = useRequestsStore();
const route = useRoute();
const router = useRouter();

const email = ref({
  val: '',
  isValid: true,
});
const message = ref({
  val: '',
  isValid: true,
});
const formIsValid = ref(true);
const emailRegex = /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,5})(\.[a-z]{2,5})?$/;

function submitForm() {
  formIsValid.value = true;
  email.value.isValid = true;
  message.value.isValid = true;

  if (!emailRegex.test(email.value.val)) {
    email.value.isValid = false;
  }
  if (message.value.val === '') {
    message.value.isValid = false;
  }
  if (!email.value.isValid || !message.value.isValid) {
    formIsValid.value = false;
    return;
  }
  const formData = {
    id: route.params.id,
    email: email.value.val,
    message: message.value.val,
  };
  requestsStore.storeRequest(formData);
  router.replace('/djs');
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="submitForm">
    <div class="form-control">
      <label :class="{ 'invalid-label': !email.isValid }" for="email"
        >E-Mail</label
      >
      <input
        class="custom-inputs"
        type="text"
        id="email"
        v-model.trim="email.val"
        :class="{ 'invalid-input': !email.isValid }"
      />
      <p class="error-message" v-if="!email.isValid">
        Please enter a valid email address.
      </p>
    </div>
    <div class="form-control">
      <label :class="{ 'invalid-label': !message.isValid }" for="message"
        >Message</label
      >
      <textarea
        class="custom-inputs"
        id="message"
        rows="5"
        v-model.trim="message.val"
        :class="{ 'invalid-input': !message.isValid }"
      ></textarea>
      <p class="error-message" v-if="!message.isValid">
        Message must not be empty.
      </p>
    </div>
    <base-button class="mt-4" color="yellow">Send Message</base-button>
  </form>
</template>

<style scoped>
.form-control {
  @apply flex flex-col items-start space-y-2;
}

.custom-inputs {
  @apply w-full border-2 border-slate-500;
}

.error-message {
  @apply text-sm;
}

.invalid-label {
  @apply text-red-500;
}
.invalid-input {
  @apply border-red-500;
}
</style>
