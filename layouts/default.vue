<template>
  <div class="bg-slate-200">
    <slot />
  </div>
</template>

<script setup>
import liff from '@line/liff';
// 1656508316-k7jNojXm
liff
  .init({
    liffId: "1656508316-k7jNojXm", // Use own liffId
  })
  .then(() => {
    const idToken = liff.getIDToken();
    console.log(idToken); // print raw idToken object
  });

// async function initializeLiff() {
//   try {
//     const line = await liff.init({ liffId: "1656508316" });
//     const idToken = await line.getLanguage();
//     console.log(idToken);
//   } catch (error) {
//     console.error('Error initializing LIFF:', error);
//   }
// }
// initializeLiff();
</script>

<style>
.p-inputtext {
  height: 2.4rem;
}

html {
  font-family: "Oxygen";
}
</style>
