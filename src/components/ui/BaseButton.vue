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
  @apply w-fit rounded-full px-6 py-2 text-center shadow-lg duration-150 ease-linear hover:scale-110;
}

button.yellow,
a.yellow {
  @apply bg-yellow-300 text-slate-900  hover:bg-yellow-400;
}

button.green,
a.green {
  @apply bg-green-400 text-white hover:bg-green-500;
}
</style>
