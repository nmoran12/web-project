<!-- DarkModeToggle.vue -->
<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// state for dark mode
const isDark = ref(false)

// for the dark 'mode' (e.g. if its light mode or dark mode)
const modeTitle = computed(() =>
  isDark.value ? 'Light mode' : 'Dark mode'
)
const iconClass = computed(() =>
  ['fas', isDark.value ? 'fa-sun' : 'fa-moon']
)

// fucntiont to toggle dark mode
function toggle() {
  isDark.value = !isDark.value
}

onMounted(() => {
  const saved = localStorage.getItem('darkMode')
  if (saved !== null) {
    isDark.value = saved === 'true'
  } else {
    isDark.value =
      window.matchMedia('(prefers-color-scheme: dark)')
            .matches
  }
})

// if dark mode is toggled, update html
watch(
  isDark,
  (val) => {
    document.documentElement.classList.toggle('dark', val)
    localStorage.setItem('darkMode', val)
  },
  { immediate: true }
)
</script>

<template>
  <button class="icon-btn" @click="toggle":title="modeTitle"><i :class="iconClass"></i></button>
</template>

<style scoped>
</style>
