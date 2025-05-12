<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'


const emit = defineEmits(['view-profile','view-saved','logout'])
const isOpen = ref(false)
const root = ref(null)

function goProfile() {
  toggle()
  emit('view-profile')
}
function goSaved() {
  toggle()
  emit('view-saved')
}

// local open/closed state
function toggle() {
  isOpen.value = !isOpen.value
}

// close when clicking anywhere else
onClickOutside(root, () => {
  isOpen.value = false
})
</script>

<template>
  <div class="user-dropdown" ref="root">
    <button class="icon-btn" @click="toggle" aria-label="Account menu">
      <i class="fas fa-circle-user"></i>
    </button>

    <ul v-if="isOpen" class="dropdown-menu">
        <li><a href="#" @click.prevent="goProfile">View Profile</a></li>
        <li><a href="#" @click.prevent="goSaved">Saved Shows &amp; Movies</a></li>
        <li><a href="#" @click.prevent="emit('logout')">Log Out</a></li>
    </ul>
  </div>
</template>

<style scoped>
.user-dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: #222;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.6);
  list-style: none;
  padding: 8px 0;
  min-width: 160px;
  z-index: 10000;
}
.dropdown-menu li {
  padding: 8px 16px;
}
.dropdown-menu li + li {
  border-top: 1px solid #333;
}
.dropdown-menu a {
  color: white;
  text-decoration: none;
  display: block;
}
.dropdown-menu a:hover {
  background: rgba(255,255,255,0.1);
}
</style>
