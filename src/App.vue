<script setup>
import { RouterView } from 'vue-router';
import TheHeader from './components/layout/TheHeader.vue';
</script>

<template>
  <TheHeader />
  <RouterView />
</template>

<style>
body {
  @apply bg-gray-50;
}
</style>
