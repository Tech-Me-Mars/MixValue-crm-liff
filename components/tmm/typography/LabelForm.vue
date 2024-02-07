<template>
<label :class="`label-form ${className}`">{{ label }}</label>
</template>

<script setup>

const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: "",
    },
    icon: {
        type: String,
        default: "",
    },
    severity: {
        type: String,
        default: "primary",
    },
    size: {
        type: String,
        default: "",
    },
    outlined:{
        type: Boolean,
        default: false
    },
    className:{
        type: String,
        default: "",
    }
});
</script>