<template>
  <div>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</div>
</template>
<script setup>
import { initFlowbite } from "flowbite";
onMounted(() => {
  initFlowbite();
});
</script>
<style>
/* html *{
  padding: 0;
  margin: 0;
} */
body {
  margin: 0px !important;
  padding: 0px !important;
  font-family: "Noto Sans Thai", sans-serif;
}

* {
  font-family: "Noto Sans Thai", sans-serif;
}

.p-datatable.p-datatable-striped .p-datatable-tbody > tr:nth-child(even) {
    background: #f3f3f3;
}

.p-inputtext{
  height: 2.7rem;
}
</style>