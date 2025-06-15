<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isSliding = ref(false)
const startX = ref(0)
const sliderValue = ref(0)

function onTouchStart (e) {
  isSliding.value = true
  startX.value = e.touches[0].clientXp
}

function onTouchMove (e) {
  if (!isSliding.value) return
  const delta = e.touches[0].clientX - startX.value
  sliderValue.value = Math.min(100, Math.max(0, sliderValue.value + delta / 3))
  startX.value = e.touches[0].clientX
}

function onTouchEnd () {
  isSliding.value = false
}

function setSafeVh () {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

onMounted(() => {
  setSafeVh()
  window.addEventListener('resize', setSafeVh)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', setSafeVh)
})
</script>

<template>
  <div class="app">
    <h1 class="title">안녕 나는 너의 친구 란다</h1>

    <div class="letter-container">
      <img
        class="envelope-image"
        src="@/assets/logo.png"
        :style="{ opacity: 1 - sliderValue / 100 }"
        alt="닫힌 편지"
      />
      <img
        class="letter-image"
        src="@/assets/logo.png"
        :style="{ opacity: sliderValue / 100 }"
        alt="열린 편지"
      />
    </div>

    <div
      class="slider-track"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    >
      <div class="slider-fill" :style="{ width: `${sliderValue}%` }"></div>
      <div class="slider-thumb" :style="{ left: `${sliderValue}%` }"></div>
    </div>

    <p class="instruction">이곳을 통해 슬라이드하세요</p>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: calc(var(--vh, 1vh) * 100);
  min-height: 420px;
  width: 95vw;

  padding: 1rem;
  box-sizing: border-box;
  text-align: center;
  gap: 1.5rem;
  overflow-y: auto;
}

.title {
  font-size: 1.4rem;
  font-weight: bold;
}

.letter-container {
  position: relative;
  width: 80%;
  max-width: 300px;
  aspect-ratio: 3 / 2;
  flex-shrink: 0;
  overflow: hidden; /* ✅ 이미지 튐 방지 */
}

.letter-container img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* ✅ 이미지 비율 유지하면서 꽉 채움 */
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.4s ease;
}

.slider-track {
  position: relative;
  width: 80%;
  max-width: 400px;
  height: 40px;
  background-color: #ddd;
  border-radius: 20px;
  overflow: hidden;
  touch-action: pan-x;
  z-index: 0;
  flex-shrink: 0;
}

.slider-fill {
  height: 100%;
  background-color: #a0c4ff;
  transition: width 0.1s;
}

.slider-thumb {
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  background-color: #0077ff;
  border-radius: 50%;
  pointer-events: none;
}

.instruction {
  font-size: 1rem;
  color: #333;
}
</style>
