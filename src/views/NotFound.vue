<template>
  <section>
    <base-card
      class="rounded-lg border-2 border-slate-600 bg-gradient-to-r from-slate-600 to-slate-700 text-center text-white"
    >
      <h2 class="text-2xl font-bold">Page not found.</h2>
      <p>
        Maybe check out all our
        <Router-Link
          class="text-yellow-300 underline hover:opacity-80"
          to="/djs"
          >DJ's</Router-Link
        >.
      </p>
    </base-card>
  </section>
</template>
