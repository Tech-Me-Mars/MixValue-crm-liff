<!-- InputSearch.vue -->

<template>
    <Textarea v-model="model" :class="`${className}`" :autoResize="autoResize"  :rows="rows" :cols="cols" :disabled="disabled" :placeholder="placeholder" :readonly="readonly" />
</template>
      
<script setup>

const props = defineProps({
    disabled: {
        type: Boolean,
        default: false
    },
    placeholder: {
        type: String,
        default: "",
    },
    row: {
        type: String,
        default: "5",
    },
    cols: {
        type: String,
        default: "30",
    },
    readonly: {
        type: Boolean,
        default: false
    },
    autoResize:{
        type: Boolean,
        default: false
    },
    className:{
        type: String,
        default: "",
    },
});

const model = defineModel()
const emits = defineEmits();
const emitKeydown = (event) => {
    emits('keydown', event); // Emit the keydown event
}



</script>
      