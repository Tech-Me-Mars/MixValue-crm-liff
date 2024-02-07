<!-- Dropdown.vue -->
<template>
    <Dropdown
      filter
      autoFilterFocus
      v-model="model"
      :options="options"
      :optionLabel="optionLabel"
      :optionValue="optionValue"
      :placeholder="placeholder"
      :class="className"
      @change="handleChange"
    >
      <template #option="slotProps" v-if="customSlot">
        <TmmCustomDropdownAddNew v-if="customSlot=='AddNew'" :option="slotProps.option" :optionLabel="optionLabel" />
      </template>
    </Dropdown>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from 'vue';
  const model = defineModel()
//  [ เขียนวิธี1 รับค่าตามตำแหน่ง ที่define]
// const { filter, autoFilterFocus, options, optionLabel, optionValue, placeholder, class: dropdownClass, customSlot } = defineProps([
//   'filter',
//   'autoFilterFocus',
//   'options',
//   'optionLabel',
//   'optionValue',
//   'placeholder',
//   'class',
//   'customSlot'
// ]);
//    [เขียน วิธี2]
  const props = defineProps({
  filter: {
    type: Boolean,
    default: false,
  },
  autoFilterFocus: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array,
    default: () => [],
  },
  optionLabel: {
    type: String,
    default: '',
  },
  optionValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  dropdownClass: {
    type: String,
    default: '',
  },
  className:{
        type: String,
        default: "",
    }
});
  
  const emits = defineEmits();
  
  const handleChange = (event) => {
    emits('change', event);
  };
  </script>
  