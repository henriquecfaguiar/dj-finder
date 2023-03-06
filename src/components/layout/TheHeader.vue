<template>
  <header>
    <nav
      class="flex items-center justify-between bg-gradient-to-b from-slate-600 to-slate-900 px-4 py-10 text-white md:px-10"
    >
      <h1
        class="text-2xl font-bold duration-200 hover:text-yellow-300 md:text-4xl"
      >
        <RouterLink to="/">Find a DJ</RouterLink>
      </h1>
      <ul class="flex gap-4 text-lg md:text-xl">
        <li><RouterLink to="/djs">All DJ's</RouterLink></li>
        <li><RouterLink to="/requests">Requests</RouterLink></li>
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
