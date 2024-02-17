<template>
  <Button
    outlined
    :label="label"
    :type="type"
    :severity="severity"
    class="w-auto"
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
    default: "ดูรายละเอียด",
  },
  severity: {
    type: String,
    default: "success",
  },
  icon: {
    type: String,
    default: "mdi mdi-check",
  },
  type: {
    type: String,
    default: "button",
  },
});
</script>
