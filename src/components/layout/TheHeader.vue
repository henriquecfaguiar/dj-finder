<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../../stores/AuthStore';

const store = useAuthStore();
const { isLoggedIn } = storeToRefs(store);
const { logout } = store;
</script>

<template>
  <header>
    <nav
      class="flex items-center justify-between bg-gradient-to-b from-slate-600 to-slate-900 px-4 py-10 text-white md:px-10"
    >
      <div class="group flex flex-col-reverse items-center gap-4 md:flex-row">
        <img
          class="hidden group-hover:cursor-pointer group-hover:text-yellow-300 md:block"
          src="../../assets/images/vinyl-disc-icon-md.png"
          alt=""
        />
        <h1
          class="text-2xl font-bold duration-200 group-hover:text-yellow-300 md:text-4xl"
        >
          <RouterLink to="/">Find a DJ</RouterLink>
        </h1>
      </div>
      <ul
        class="flex flex-col items-center gap-4 text-lg md:flex-row md:text-xl"
      >
        <li><RouterLink to="/djs">All DJ's</RouterLink></li>
        <li v-if="isLoggedIn">
          <RouterLink to="/requests">Requests</RouterLink>
        </li>
        <li v-else>
          <RouterLink to="/auth">Login</RouterLink>
        </li>
        <li v-if="isLoggedIn">
          <base-button @click="logout" color="yellow">Logout</base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
ul a:active,
ul a:hover,
ul a.router-link-active {
  @apply border-b-2 border-slate-900 text-yellow-300;
}
</style>
