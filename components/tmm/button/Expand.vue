<template>
  <i
    class="text-2xl shadow-none cursor-pointer p-0 bg-transparent m-0 text-black"
    :class="`mdi mdi-${icon}`"
  >
  </i>
</template>

<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: "mdi mdi-chevron-down",
  },
  size: {
    type: String,
    default: "large",
  },
});
</script>
