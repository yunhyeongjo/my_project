<template>
  <div class="wrapper">
    <!-- 배경 이미지 -->
    <img src="@/assets/nmixx.jpg" alt="Background" class="bg-image" />
    <div class="bg-overlay"></div>

    <!-- 상단 텍스트 + 별을 포함한 컨테이너 -->
    <div class="top-text">
      <!-- 반짝이 별 SVG -->
      <svg v-for="n in 11" :key="n" :class="['star', `star-${n}`]" viewBox="0 0 24 24">
        <polygon
          points="12,2 15,9 22,9 17,14 18.5,21 12,17 5.5,21 7,14 2,9 9,9"
          fill="white"
          opacity="0.8"
        />
      </svg>

      <!-- 실제 텍스트 -->
      <div class="text-lines">
        <p>유니에게 메세지가 도착 했습니다</p>
        <p>오키나와에서는 무슨일이?</p>
      </div>
    </div>

    <!-- 하단 문구 -->
    <div class="bottom-text" @click="goToNext">
      <p>여기를 눌러서 이동하기</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import BgmPlayer from '@/components/BgmPlayer.vue'

const router = useRouter()

function goToNext () {
  router.push('/next')
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

<style scoped>
@font-face {
  font-family: 'Imk';
  src: url('@/assets/fonts/KCC-Imkwontaek.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Gwoun';
  src: url('@/assets/fonts/GowunDodum-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}


.wrapper {
  position: relative;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
}

/* 배경 이미지 */
.bg-image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

/* 배경 오버레이 */
.bg-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1;
}

/* 상단 텍스트 전체 */
.top-text {
  position: relative;
  top: 15%;
  width: 100%;
  text-align: center;
  font-family: 'Gwoun', sans-serif;
  z-index: 2;
}

/* 실제 텍스트는 별보다 위에 표시 */
.text-lines {
  position: relative;
  z-index: 3;
  color: rgb(0, 0, 0);
  font-size: 1.3rem;
  text-shadow: rgba(0, 0, 0, 0.7);
}

.text-lines p {
  margin: 4px 0;
}

/* 별 SVG */
.star {
  position: absolute;
  width: 12px;
  height: 12px;
  z-index: 2;
  animation: sparkle 2s infinite ease-in-out;
  filter: drop-shadow(0 0 6px white);
  pointer-events: none;
}

/* 기존 6개는 유지 */
.star-1  { top: -20px; left: 25%; animation-delay: 0s; }
.star-2  { top: -10px; left: 65%; animation-delay: 0.2s; }
.star-3  { bottom: -20px; left: 30%; animation-delay: 0.4s; }
.star-4  { bottom: -15px; left: 70%; animation-delay: 0.6s; }
.star-5  { top: 50%; left: -20px; animation-delay: 0.8s; }
.star-6  { top: 50%; right: -20px; animation-delay: 1.0s; }

/* 추가된 별들 */
.star-7  { top: -25px; left: 45%; animation-delay: 0.3s; }
.star-8  { bottom: -25px; left: 55%; animation-delay: 0.5s; }
.star-9  { top: 20%; left: 5%; animation-delay: 0.7s; }
.star-10 { top: 20%; right: 5%; animation-delay: 0.9s; }
.star-11 { bottom: -10px; right: 15%; animation-delay: 1.3s; }

/* 별 반짝이 효과 */
@keyframes sparkle {
  0%, 100% {
    opacity: 0;
    transform: scale(0.5) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1.4) rotate(20deg);
  }
}

/* 하단 문구 깜빡이기 */
.bottom-text {
  position: absolute;
  top: 70%;
  width: 100%;
  text-align: center;
  color: white;
  font-size: 1.4rem;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);
  font-family: 'Imk', sans-serif;
  z-index: 2;
  animation: blink 1.5s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
