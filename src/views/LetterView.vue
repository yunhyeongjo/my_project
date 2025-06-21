<template>
  <div class="final-page">
    <img src="@/assets/blackground.jpg" class="background" alt="night sky" />

    <div class="text-wrapper">
      <div v-for="(line, index) in displayedLines" :key="index" class="glitch-text">
        <p>{{ line }}</p>
      </div>
      <div v-if="showProposal || proposalText" class="proposal-text">
        {{ proposalText }}
      </div>

      <transition name="fade" mode="out-in">
        <div v-if="showButtons" class="choice-buttons">
          <button @click="onYesClick">Yes</button>
          <button
            ref="noButtonRef"
            @mouseenter="hideNoButton"
            @touchstart="hideNoButton"
          >
            No
          </button>
        </div>
      </transition>
    </div>

    <transition name="fade" mode="out-in">
      <div v-if="showBox">
        <BoxView :shouldOpenBox="shouldOpenBox"/>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BoxView from './BoxView.vue'

const finalLines = [
  '비록 완벽하지 않고, 부족한 나지만',
  '내곁에 항상 있어서줘 고맙고 사랑해',
  '내 평생을 이제는 수현이와 함께 하고 싶어'
]

const displayedLines = ref([])
const showProposal = ref(false)
const proposalText = ref('')
const showButtons = ref(false)
const showBox = ref(false)
const shouldOpenBox = ref(false) 

const noButtonRef = ref(null)

function hideNoButton() {
  showNoButton.value = false
}

const showNoButton = ref(true)

function playFinalLines() {
  let currentLine = 0

  function showLine() {
    const text = finalLines[currentLine]
    let i = 0
    let lineChars = []

    const interval = setInterval(() => {
      lineChars.push(text[i])
      if (displayedLines.value.length <= currentLine) {
        displayedLines.value.push('')
      }
      displayedLines.value[currentLine] = lineChars.join('')
      i++
      if (i >= text.length) {
        clearInterval(interval)
        currentLine++
        if (currentLine < finalLines.length) {
          setTimeout(showLine, 1000)
        } else {
          setTimeout(() => {
            let i = 0
            const fullText = '나와 결혼 해줄래?'
            const interval = setInterval(() => {
              proposalText.value += fullText[i]
              i++
              if (i >= fullText.length) {
                clearInterval(interval)
                showProposal.value = true

                // 버튼과 박스를 시간차로 표시
                setTimeout(() => {
                  showButtons.value = true
                  setTimeout(() => {
                    showBox.value = true
                  }, 1000)
                }, 1000)
              }
            }, 180)
          }, 1000)
        }
      }
    }, 180)
  }

  showLine()
}

function onYesClick() {
  shouldOpenBox.value = true
  // console.log(shouldOpenBox.value)
}

onMounted(() => {
  playFinalLines()
})
</script>

<style scoped>
.final-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: black;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.background {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.text-wrapper {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.6rem;
  font-family: 'Imk', sans-serif;
  color: white;
  text-align: center;
  line-height: 1.2;
  gap: 0.4rem;
  transform: translateY(-40%);
}

.glitch-text span {
  display: inline-block;
  text-shadow: 0 0 2px #fff;
  transition: opacity 0.3s ease-in;
}

.proposal-text {
  margin-top: 1.5rem;
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.9);
  white-space: pre-wrap;
}

.choice-buttons {
  margin-top: 2rem;
  display: flex;
  gap: 2rem;
  justify-content: center;
  z-index: 5;
}

.choice-buttons button {
  background: white;
  border: 1px solid #ddd;
  padding: 10px 20px;
  width: 90px;
  height: 60px;
  font-size: 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  color: #777;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  transition: 400ms background, color;
}

.choice-buttons button:hover {
  background: #eee;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
