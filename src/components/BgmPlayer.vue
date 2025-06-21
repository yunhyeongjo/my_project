<template>
  <div class="bgm-controller">
    <button @click="toggleMusic">
      {{ isPlaying ? '🔊     ' : '🔈 ' }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import bgmFile from '@/assets/bgm.mp4' // assets 폴더에 bgm.mp3 위치

const isPlaying = ref(true)
const audio = ref(null)

onMounted(() => {
  audio.value = new Audio(bgmFile)
  audio.value.loop = true
  audio.value.volume = 0.5

  audio.value.play().catch(err => {
    console.warn('자동 재생 실패:', err)
    isPlaying.value = false
  })
})

onBeforeUnmount(() => {
  if (audio.value) {
    audio.value.pause()
    audio.value = null
  }
})

function toggleMusic () {
  if (!audio.value) return

  if (isPlaying.value) {
    audio.value.pause()
  } else {
    audio.value.play().catch(err => console.warn('재생 실패', err))
  }

  isPlaying.value = !isPlaying.value
}
</script>

<style scoped>
.bgm-controller {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999; /* 항상 위에 */
}

.bgm-controller button {
  background: rgba(255, 255, 255, 0);
  border: none;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  /* box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2); */
  transition: background 0.3s;
}

button:hover {
  background: rgba(255, 255, 255, 0);
}
</style>