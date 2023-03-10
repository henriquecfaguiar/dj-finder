<script setup>
import { ref } from 'vue';

const email = ref({
  val: '',
  isValid: true,
});
const message = ref({
  val: '',
  isValid: true,
});
const formIsValid = ref(true);
const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,5})(\.[a-z]{2,5})?$/;

function submitForm() {
  formIsValid.value = true;
  if (!emailRegex.test(email.value)) {
    email.value.isValid = false;
  }
  if (message.value === '') {
    message.value.isValid = false;
  }
  if (!email.value.isValid || !message.value.isValid) {
    formIsValid.value = false;
    return;
  }
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="email">E-Mail</label>
      <input type="email" id="email" v-model.trim="email.val" />
      <p v-if="!email.isValid">Please enter a valid email address.</p>
    </div>
    <div class="form-control">
      <label for="message">Message</label>
      <textarea id="message" rows="5" v-model.trim="message.val"></textarea>
      <p v-if="!message.isValid">Message must not be empty.</p>
    </div>
    <base-button color="yellow">Send Message</base-button>
  </form>
</template>

<style scoped>
.form-control {
  @apply flex flex-col items-start space-y-2;
}
</style>
