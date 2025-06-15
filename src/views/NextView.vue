<template>
  <div id="bbdoy">
    <BgmPlayer />
    <div class="next-wrapper">
      <div class="sakura-container"></div>

      <div class="fade-block">
        <transition name="fade" mode="out-in">
          <div v-if="currentItem" :key="currentIndex" class="image-container">
            <img :src="currentItem.img" alt="Slide" class="fade-image" />
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
import BgmPlayer from '@/components/BgmPlayer.vue'
import img1 from '../assets/img1.jpg'
import img2 from '../assets/img2.jpg'
import img3 from '../assets/img3.jpg'
import img4 from '../assets/img4.jpg'
import img5 from '../assets/img5.jpg'

const TYPING_DELAY = 1000
const TYPING_SPEED = 100
const DISPLAY_DURATION = 4000

const router = useRouter()

function goToNext() {
  router.push('/next')
}

const items = [
  { img: img1, text: '첫 번째 이야기입니다' },
  { img: img2, text: '두 번째 장면이 시작됩니다' },
  { img: img3, text: '세 번째로 넘어가볼까요?' },
  { img: img4, text: '네 번째 사진입니다' },
  { img: img5, text: '마지막 이야기를 전합니다' }
]

const showNextLink = ref(false)
const currentIndex = ref(0)
const typedText = ref('')
const currentItem = ref(items[0])

function typeText(text) {
  typedText.value = ''
  let i = 0
  const interval = setInterval(() => {
    typedText.value += text[i]
    i++
    if (i >= text.length) clearInterval(interval)
  }, TYPING_SPEED)
}

function showItem(index) {
  currentItem.value = null
  typedText.value = ''

  setTimeout(() => {
    currentIndex.value = index
    currentItem.value = items[index]
    setTimeout(() => {
      typeText(items[index].text)
    }, TYPING_DELAY)
  }, 300)
}

onMounted(() => {
  setTimeout(() => {
    typeText(items[0].text)
  }, TYPING_DELAY)

  let i = 1
  const interval = setInterval(() => {
    if (i < items.length) {
      showItem(i)
      i++
    } else {
      clearInterval(interval)
      setTimeout(() => {
        showNextLink.value = true
      }, 100)
    }
  }, DISPLAY_DURATION)

  new Sakura("#bbdoy")
})

</script>

<style scoped>
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
  top: 20%;
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
  bottom: 5%;
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
</style>
