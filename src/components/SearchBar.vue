<template>
    <input
      class="search-bar"
      :placeholder="placeholder"
      v-model="value"
    />
  </template>
  
  <script setup>
  import { defineProps, defineEmits, computed } from 'vue'
  const props = defineProps({
    modelValue: String,
    placeholder: { type: String, default: '' }
  })
  const emit = defineEmits(['update:modelValue'])
  const value = computed({
    get: () => props.modelValue,
    set: (v) => emit('update:modelValue', v)
  })
  </script>
  
  <style scoped>
  .search-bar {
  flex: 0 0 auto;
  width: 300px;
  max-width: 50vw;
  padding: 8px 16px;
  border-radius: 999px;
  border: none;
  outline: none;
  box-shadow: var(--shadow-search);
  background-color: var(--bg-secondary);
}
  </style>