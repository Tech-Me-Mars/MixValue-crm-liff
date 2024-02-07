<template>
    <Tag :value="label" :severity="severity"></Tag>
</template>

<script setup>
import Tag from 'primevue/tag';
const props = defineProps({
    disabled: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: "",
    },
    severity:{
        type: String,
        default: "primary",
    }
});
</script>