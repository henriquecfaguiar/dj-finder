<script setup>
const props = defineProps({
  color: {
    type: String,
    required: false,
    default: null,
  },
  link: {
    type: Boolean,
    required: false,
    default: false,
  },
  to: {
    type: String,
    required: false,
    default: '/',
  },
});
</script>

<template>
  <button v-if="!props.link" :class="props.color">
    <slot></slot>
  </button>
  <RouterLink v-else :to="props.to" :class="props.color">
    <slot></slot>
  </RouterLink>
</template>

<style scoped>
button,
a {
  @apply w-fit rounded-full border-2 px-6 py-2 text-center shadow-lg duration-200 hover:scale-105 hover:opacity-80;
}

button.yellow,
a.yellow {
  @apply border-yellow-300 bg-yellow-300 text-slate-900;
}

button.green,
a.slate {
  @apply border-green-500 bg-green-500 text-white;
}
</style>
