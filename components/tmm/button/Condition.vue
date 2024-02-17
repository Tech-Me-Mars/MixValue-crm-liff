<template>
  <Button
    outlined
    :label="label"
    :type="type"
    :severity="severity"
    class="w-auto border-gray-300 border-2"
    :loading="loading"
  >
  </Button>
</template>

<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "ดูเงื่อนไข",
  },
  severity: {
    type: String,
    default: "secondary",
  },
  type: {
    type: String,
    default: "button",
  },
});
</script>
