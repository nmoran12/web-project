<template>
    <div class="movie-card">
      <img :src="poster" :alt="title" class="poster" />
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  const props = defineProps({
    title: String,
    poster: String
  })
  </script>
  
  <style scoped>
  .movie-card {
    position: relative;
    flex: 0 0 auto;
    width: 300px;
    border-radius: 16px;
    overflow: hidden;
    background: #222;
    color: #fff;
    text-align: center;
    margin-right: 16px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.7);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .movie-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 25px rgba(0,0,0,0.8);
    z-index: 10;
  }
  .poster {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .title {
    padding: 8px;
    font-size: 0.9rem;
  }
  </style>
  