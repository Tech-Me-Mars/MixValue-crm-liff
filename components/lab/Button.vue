<template>
    <div><Button :class="className" :label="label"  /></div>
</template>

<script setup>

const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: "เพิ่มข้อมูล",
    },
    icon: {
        type: String,
        default: "mdi mdi-text-box-plus-outline",
    },
    severity: {
        type: String,
        default: "success",
    },
    size: {
        type: String,
        default: "",
    },
    className:{
        type: String,
        default: "",
    }
});

</script>