<template>
    <section class="movie-row">
      <h2 class="row-title">{{ title }}</h2>
      <div class="row-items-container">
        <div class="row-items">
        <MovieCard
          v-for="item in items"
          :key="item.id"
          :title="item.title"
          :poster="item.poster"
        />
      </div>
    </div>
    </section>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  import MovieCard from './MovieCard.vue'
  const props = defineProps({
    title: String,
    items: Array
  })
  </script>
  
  <style scoped>
  .movie-row {
    text-align: left;
    margin: 24px 0;
  }
  .row-title {
    background: transparent;
    /*background: linear-gradient(90deg, #ff7a7a, #c27cfd);*/
    border-radius: 12px;
    padding: 8px 16px;
    color: var(--text-primary);
    display: inline-block;
    margin-bottom: 12px;
  }

  .row-items-container {
  overflow: visible;
}

  .row-items {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 8px;
  }

  .row-items::-webkit-scrollbar {
    display: none;
  }
  </style>