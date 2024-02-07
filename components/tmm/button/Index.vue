<template>
    <!-- <Button :label="label" :loading="loading" :size="size" :severity="severity" >
        <i v-if="icon" :class="`${icon} mr-1`"></i><span v-if="icon">{{ label }}</span>
    </Button> -->
    <Button :label="label" :icon="icon" :type="type" :severity="severity" :class="`${className}`" :size="size" :loading="loading" :outlined="outlined" />
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
    type: {
        type: String,
        default: "button",
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