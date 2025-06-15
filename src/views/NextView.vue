<template>
  <BgmPlayer />
  <div class="next-wrapper">
    <transition name="fade" mode="out-in">
      <div
        v-if="currentItem"
        :key="currentIndex"
        class="fade-block"
      >
        <img :src="currentItem.img" alt="Slide" class="fade-image" />
        <p class="fade-text">{{ typedText }}</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BgmPlayer from '@/components/BgmPlayer.vue'

// === ✅ 설정값 (자유롭게 조절 가능) ===
const TYPING_DELAY = 1000 // 이미지가 뜬 후, 타자기 효과 시작까지 대기 시간 (ms)
const TYPING_SPEED = 100 // 타자기 효과로 한 글자 표시 속도 (ms)
const DISPLAY_DURATION = 4000 // 하나의 항목(이미지+텍스트) 보여주는 전체 시간 (ms)

// === ✅ 항목 목록 (이미지 경로 + 텍스트) ===
const items = [
  { img: '../assets/img1.jpg', text: '첫 번째 이야기입니다' },
  { img: '../assets/img2.jpg', text: '두 번째 장면이 시작됩니다' },
  { img: '../assets/img3.jpg', text: '세 번째로 넘어가볼까요?' },
  { img: '../assets/img4.jpg', text: '네 번째 사진입니다' },
  { img: '../assets/img5.jpg', text: '마지막 이야기를 전합니다' }
]

const currentIndex = ref(0)
const typedText = ref('')
const currentItem = ref(items[0])

// 타자기 효과 출력 함수
function typeText (text) {
  typedText.value = ''
  let i = 0
  const interval = setInterval(() => {
    typedText.value += text[i]
    i++
    if (i >= text.length) clearInterval(interval)
  }, TYPING_SPEED)
}

// 항목 전환 함수
function showItem (index) {
  currentItem.value = null
  typedText.value = ''

  setTimeout(() => {
    currentIndex.value = index
    currentItem.value = items[index]
    setTimeout(() => {
      typeText(items[index].text)
    }, TYPING_DELAY)
  }, 300) // 트랜지션 대기 시간
}

// 최초 mount 시 실행
onMounted(() => {
  // 첫 항목: 이미지 즉시 → 텍스트는 1초 후
  setTimeout(() => {
    typeText(items[0].text)
  }, TYPING_DELAY)

  // 2번째 이후 항목 순차 진행
  let i = 1
  const interval = setInterval(() => {
    if (i < items.length) {
      showItem(i)
      i++
    } else {
      clearInterval(interval)
    }
  }, DISPLAY_DURATION)
})
</script>

<style scoped>
/* 전체 뷰 */
.next-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  flex-direction: column;
  position: relative;
}

/* 이미지 + 텍스트가 항상 중앙에 위치 */
.fade-block {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
  max-width: 320px;
}

/* 이미지 중앙 고정 */
.fade-image {
  width: 100%;
  height: auto;
  max-width: 300px;
  border-radius: 12px;
  object-fit: contain;
  display: block;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: opacity 0.5s ease;
}

/* 텍스트 */
.fade-text {
  margin-top: 12px;
  font-size: 1.2rem;
  color: #333;
  font-family: 'Imk', sans-serif;
  white-space: pre-wrap;
}

/* 페이드 효과 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.6s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
