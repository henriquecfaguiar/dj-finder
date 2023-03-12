<script setup>
import { RouterView } from 'vue-router';
import TheHeader from './components/layout/TheHeader.vue';
</script>

<template>
  <TheHeader />
  <RouterView v-slot="slotProps">
    <Transition name="fade" mode="out-in">
      <component :is="slotProps.Component"></component>
    </Transition>
  </RouterView>
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
