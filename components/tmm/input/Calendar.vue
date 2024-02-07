<template>
    <Calendar v-model="model" showIcon :placeholder="placeholder" :class="`${className}`" :dateFormat="customDateFormat(model)"
        :minDate="minDate" showButtonBar  />
</template>
  
<script setup>
import { formatDate, customDateFormat } from '@/helpers/utility';
const model = defineModel()
const props = defineProps({
    disabled: {
        type: Boolean,
        default: false
    },
    placeholder: {
        type: String,
        default: "",
    },
    minDate: {
        type: Date,
        default: null,
    },
    className:{
        type: String,
        default: "",
    }

});

const emits = defineEmits();
const emitKeydown = (event) => {
    emits('keydown', event); // Emit the keydown event
}


</script>
  


