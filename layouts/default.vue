<template>
  <div class="bg-slate-200">
    <!-- <Header /> -->
    <!-- <Sidebar class="" /> -->
    <!-- <div class="pt-32 min-h-screen p-4 sm:ml-64"> -->
      <!-- <NuxtLoadingIndicator color="#348feb" height="10" /> -->
      
      <slot />
    <!-- </div> -->

  </div>
</template>

<script setup>
import Header from "./header.vue";
import Footer from "./footer.vue";
import Sidebar from "./sidebar.vue";


</script>

<style>
.p-inputtext {
    height: 2.4rem;
}
html {
  font-family: "Oxygen";
}
</style>
