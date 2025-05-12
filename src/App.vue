<script setup>
import { ref } from 'vue'
import SearchBar from './components/SearchBar.vue'
import MovieRow from './components/MovieRow.vue'
import UserDropdown from './components/UserDropdown.vue'
import UserProfile  from './components/UserProfile.vue'

// Feature 1: Dark Mode
import DarkModeToggle from './components/DarkModeToggle.vue'


// changes current view to 'profile' so the profile is shown
// its done this way because we cant use vue routers
function showProfile() {
  currentView.value = 'profile'
}

// changes current view to 'home'
function goHome() {
  currentView.value = 'home'
}

// this view is 'home'
const currentView = ref('home')


const searchQuery = ref('')

// mock data arrays (replace with real API data)
const watchlist = ref([
  { id: 1, poster: 'images/avengersEndgame.jpeg' },
  { id: 2, title: 'Watchlist 2', poster: '/images/spidermanImage.jpeg' },
  { id: 3, title: 'Watchlist 3', poster: '/images/harryPotter.jpeg' },
  { id: 4, title: 'Watchlist 4', poster: '/images/wolfOfWallStreet.avif' },
  { id: 5, title: 'Watchlist 5', poster: 'images/theSimpsonsImage.webp' },
  { id: 6, title: 'Watchlist 6', poster: '/placeholder5.jpg' },
])
const trending = ref([
  { id: 101, title: 'Trending 1', poster: 'images/severanceImage.jpeg' },
  { id: 102, title: 'Trending 2', poster: 'images/adolescenceImage.webp' },
  { id: 103, title: 'Trending 3', poster: 'images/theOfficeImage.jpeg' }
])
const recommendations = ref([
  { id: 201, title: 'Rec 1', poster: 'images/whiteLotusImage.jpg' },
  { id: 202, title: 'Rec 2', poster: 'images/lastOfUsImage.jpg' }
])
</script>

<template>
  <div id="app">
    <header class="header">

      <!-- navigation bar 'nav-island'-->
      <div class="nav-island">

        <!-- the current placeholder logo 'MyApp', when you click it, it takes you to 'home' view-->
        <div class="logo-text" @click="goHome" style="cursor: pointer;">MyApp</div>

        <SearchBar v-model="searchQuery" placeholder="Search" class="island-search"/>

        <UserDropdown
          @view-profile="showProfile"
          @logout="handleLogout"
        />

        <!-- dark mode toggling -->
        <DarkModeToggle/>

      </div>
    </header>

    <!-- headers for rows -->
    <div class="main-content">
      <div v-if="currentView==='home'">
      <MovieRow title="Your Watchlist" :items="watchlist" />
      <MovieRow title="Trending Now"    :items="trending"  />
      <MovieRow title="Shows you might also like!" :items="recommendations" />
    </div>

    <!-- PROFILE: for the drop-down menu so when you click 'view profile' it takes you to the UserProfile view -->
    <div v-else-if="currentView==='profile'">
        <UserProfile/>
      </div>
  </div>
  </div>
</template>

<style>
  header.header {
  position: fixed;
  top: 0; left: 0; right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 2rem;
  background: transparent;
  box-sizing: border-box;
  z-index: 1000;
  max-width: 1280px;
  margin: 0 auto;
}

.nav-island {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--bg-island);
  backdrop-filter: blur(8px);
  padding: 8px 16px;
  border-radius: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.controls {
  display: flex;
  gap: 12px;
}

  .main-content {
    padding-top: 64px;
  }

.island-search {
  flex: 0 0 auto;
  width: 240px;
  max-width: 40vw;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--text-primary);
  cursor: pointer;
}

</style>