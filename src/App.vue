<script setup>
import { RouterView } from 'vue-router';
import { useAuthStore } from './stores/AuthStore';
import TheHeader from './components/layout/TheHeader.vue';
import TheFooter from './components/layout/TheFooter.vue';

const store = useAuthStore();
store.tryLogin();
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <TheHeader />
    <RouterView v-slot="slotProps" class="flex-1">
      <Transition name="fade" mode="out-in">
        <component :is="slotProps.Component"></component>
      </Transition>
    </RouterView>
    <TheFooter class="mt-auto" />
  </div>
</template>

<style>
body {
  @apply bg-gray-50;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.fade-enter-active {
  transition: all 0.3s ease-out;
}
.fade-leave-active {
  transition: all 0.3s ease-in;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
