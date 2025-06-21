<template>
  <BgmPlayer />
  <router-view />
</template>

<script setup>
import BgmPlayer from '@/components/BgmPlayer.vue'
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden; /* ✅ 스크롤 제거 */
  height: 100%;
}
</style>
