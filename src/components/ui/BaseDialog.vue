<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  fixed: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const emits = defineEmits(['close']);

function tryClose() {
  if (props.fixed) {
    return;
  }
  emits('close');
}
</script>

<template>
  <teleport to="body">
    <div v-if="props.show" @click="tryClose" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="props.show">
        <header class="w-full bg-gradient-to-b from-slate-600 to-slate-900 p-4">
          <slot name="header">
            <h2 class="text-xl text-white">{{ props.title }}</h2>
          </slot>
        </header>
        <section class="p-4">
          <slot></slot>
        </section>
        <menu class="flex justify-end p-4" v-if="!props.fixed">
          <slot name="actions">
            <base-button color="yellow" @click="tryClose">Close</base-button>
          </slot>
        </menu>
      </dialog>
    </transition>
  </teleport>
</template>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

dialog {
  position: fixed;
  top: 20vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}

.dialog-leave-active {
  transition: all 0.3s ease-in;
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>
