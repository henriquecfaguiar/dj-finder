<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
// import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/AuthStore';

// const router = useRouter();
const store = useAuthStore();
const { error, isLoading } = storeToRefs(store);
const { signUp } = store;

function handleError() {
  error.value = null;
}

const email = ref({
  val: '',
  isValid: true,
});
const password = ref({
  val: '',
  isValid: true,
});
const mode = ref('login');
const formIsValid = ref(true);
const emailRegex = /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,5})(\.[a-z]{2,5})?$/;

function switchAuthMode() {
  if (mode.value === 'login') {
    mode.value = 'signup';
  } else {
    mode.value = 'login';
  }
}

function submitForm() {
  formIsValid.value = true;
  email.value.isValid = true;
  password.value.isValid = true;

  if (!emailRegex.test(email.value.val)) {
    email.value.isValid = false;
  }
  if (password.value.val.length < 8) {
    password.value.isValid = false;
  }
  if (!email.value.isValid || !password.value.isValid) {
    formIsValid.value = false;
    return;
  }
  const formData = {
    email: email.value.val,
    password: password.value.val,
  };
  mode.value === 'signup' ? signUp(formData) : login(formData);
  // router.replace('/djs');
}
</script>

<template>
  <div>
    <base-dialog :show="!!error" title="An error ocurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div class="form-control">
          <label :class="{ 'invalid-label': !email.isValid }" for="email"
            >E-Mail</label
          >
          <input
            :class="{ 'invalid-input': !email.isValid }"
            class="custom-inputs"
            type="text"
            id="email"
            v-model.trim="email.val"
          />
          <p class="error-message" v-if="!email.isValid">
            Please enter a valid email address.
          </p>
        </div>
        <div class="form-control">
          <label :class="{ 'invalid-label': !password.isValid }" for="password"
            >Password</label
          >
          <input
            :class="{ 'invalid-input': !password.isValid }"
            class="custom-inputs"
            type="password"
            id="password"
            v-model.trim="password.val"
          />
          <p class="error-message" v-if="!password.isValid">
            Your password must have at least 8 characters.
          </p>
        </div>
        <div class="flex gap-6">
          <base-button @click="switchAuthMode" color="yellow"
            >Login</base-button
          >
          <base-button @click="switchAuthMode" color="green"
            >Sign Up</base-button
          >
        </div>
      </form>
    </base-card>
  </div>
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
