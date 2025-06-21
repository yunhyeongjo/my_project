<template>
  <div id="bbdoy">
    <div class="next-wrapper">
      <img src="@/assets/background2.jpg" alt="Background" class="bg-image" />
      <div class="sakura-container"></div>

      <div class="fade-block">
        <transition name="fade" mode="out-in">
          <div v-if="currentItem" :key="currentIndex" class="image-container">
            <img v-if="currentItem.img" :src="currentItem.img" alt="Slide" class="fade-image" />
            <video v-else-if="currentItem.video" :src="currentItem.video" class="fade-video" autoplay muted loop playsinline />
          </div>
        </transition>
        <transition name="fade" mode="out-in">
          <div v-if="currentItem" :key="'text-' + currentIndex" class="text-container">
            <p class="fade-text">{{ typedText }}</p>
          </div>
        </transition>
      </div>
    </div>
    <div class="bottom-text" v-if="showNextLink" @click="goToNext">
      <p>여기를 눌러서 이동하기</p>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import img1 from '../assets/nextimg/img1.jpeg'
import img2 from '../assets/nextimg/img2.jpg'
import img3 from '../assets/nextimg/img3.jpg'
import img4 from '../assets/nextimg/img4.jpeg'
import video from '../assets/nextimg/video.mp4'
import video2 from '../assets/nextimg/video2.mp4'
import video3 from '../assets/nextimg/video3.mp4'

const TYPING_SPEED = 100              // 글자 하나씩 타이핑 속도
const TYPING_DELAY = 800              // 타이핑 시작 전 딜레이
const PHASE_DISPLAY_TIME = 1500       // 문장 완성 후 유지 시간
const IMAGE_CHANGE_DELAY = 800        // 이미지 전환 전 딜레이

const router = useRouter()

function goToNext() {
  router.push('/Letter')
}

const items = [
  { img: img1, phases: [
    '우리가 처음 만났던 그때, 우리는 알았을까?',
    '풋풋 했던 20대를 지나, 10년이라는 기간을',
    '함께하며 없어서는 안될 존재가 될 줄을 말이야.'
  ] },
  { img: img2, phases: [
    '10년이라는 기간 동안 모든 날, 모든 일',
    '사소한 일상도 뚜니와 함께라면 특별했어',
    '뚜니도 그렇지?'  
  ] },
  { video: video, phases: [
    '때로는 다투고, 웃고, 울고 그랬지만 그것이',
    '우리를 더 단단하게 만들고, 서로를 맞춰가는 법을',
    '알게 될 수 있었던 것 같아.'
  ] },
  { img: img3, phases: [
    '뚜니는 배려심이 많은 사람이어서 \n 누구보다 나를 생각해주고',
    '내가 감정 기복이 심해도 맞춰줘서 \n 항상 고맙고 미안해'
  ] },
  { video: video2, phases: [
    '항상 나로 가득차 있다는것을 보여 주고 \n 표현도 많이 해줘서 고마워',
    '역시 가장 잘한 선택은 뚜니를 사랑한 일이야 ♥'
  ] }, 
  { video: video3, phases: [
    '우리가 같이 살면서 \n 같이 있다는 행복감이 무엇인지',
    '사랑하는 사람과 함께한다는 점이 얼마나 \n 행복한 것인지',
    '깨달았어'
  ] },
  { img: img4, phases: [
    '그럴수록 점점 확신이 들기 시작했고',
    '뚜니와 평생 함께하며, \n 뚜니와 이 행복을 같이하고 싶게 됐어'
  ] }, 
]

const currentIndex = ref(0)
const currentPhaseIndex = ref(0)
const typedText = ref('')
const currentItem = ref(items[0])
const showNextLink = ref(false)

function typeText(text, callback) {
  typedText.value = ''
  let i = 0
  const interval = setInterval(() => {
    typedText.value += text[i]
    i++
    if (i >= text.length) {
      clearInterval(interval)
      setTimeout(() => {
        callback?.()
      }, PHASE_DISPLAY_TIME)
    }
  }, TYPING_SPEED)
}

function playPhase() {
  const item = items[currentIndex.value]
  const phase = item.phases[currentPhaseIndex.value]
  setTimeout(() => {
    typeText(phase, () => {
      currentPhaseIndex.value++
      if (currentPhaseIndex.value < item.phases.length) {
        playPhase() // 다음 phase 진행
      } else {
        // phase 끝났으면 다음 이미지로 전환
        currentPhaseIndex.value = 0
        currentIndex.value++
        if (currentIndex.value < items.length) {
          typedText.value = ''
          currentItem.value = null
          setTimeout(() => {
            currentItem.value = items[currentIndex.value]
            playPhase()
          }, IMAGE_CHANGE_DELAY)
        } else {
          showNextLink.value = true
        }
      }
    })
  }, TYPING_DELAY)
}

onMounted(() => {
  currentItem.value = items[0]
  playPhase()
  new Sakura('#bbdoy')
})
</script>

<style scoped>
.bg-image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 0.6;
}

.next-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  flex-direction: column;
  position: relative;
}

.fade-block {
  position: relative;
  width: 100%;
  max-width: 360px;
  height: 100%;
  pointer-events: none;
}

.image-container {
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fade-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.text-container {
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  text-align: center;
}

.fade-text {
  font-size: 1.2rem;
  color: #333;
  font-family: 'Imk', sans-serif;
  white-space: pre-wrap;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.bottom-text {
  position: absolute;
  bottom: 10%;
  width: 100%;
  text-align: center;
  color: rgb(0, 0, 0);
  font-size: 1.4rem;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);
  font-family: 'Imk', sans-serif;
  z-index: 2;
  animation: blink 1.5s infinite;
  cursor: pointer;
}

@keyframes blink {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}

.fade-video {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px;
  background: black;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}
</style>
