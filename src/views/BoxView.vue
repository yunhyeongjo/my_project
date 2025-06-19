<template>
  <div class="App">
    <div class="img-container">
      <img class="kuku" :class="state.jump" :src="kuku" alt="kuku" />
      <button class="box" @click="animate">
        <img :src="box" alt="box" />
      </button>
      <img class="lid" :class="[state.move, state.rotating, state.rotated]" :src="boxLid" alt="box-lid" />
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import box from '@/assets/box.png'
import boxLid from '@/assets/box-lid.png'
import kuku from '@/assets/jump-character.png'

// import Confetti from './confetti/Confetti.vue' // Vue용 Confetti로 교체 필요

const initState = {
  move: 'move',
  jump: '',
  rotated: '',
  rotating: ''
}

const state = reactive({ ...initState })

function animate() {
  const isDone = state.rotated === 'rotated'

  if (!isDone) {
    state.rotating = 'rotating'
    setTimeout(() => {
      state.jump = 'jump'
    }, 300)
    setTimeout(() => {
      state.rotated = 'rotated'
    }, 1000)
  } else {
    Object.assign(state, initState)
  }

  state.move = state.move === 'move' ? '' : 'move'
}
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  background: #f06a19;
}

.App {
  font-family: sans-serif;
  text-align: center;
}

.box {
  background: transparent;
  border: 0;
  margin: 0;
  padding: 0;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  bottom: 0;
  cursor: pointer;
  outline: none;
}

.box img {
  margin: -5px;
}

.kuku {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  bottom: 0;
  z-index: -1;
}

.lid {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  bottom: 5.8em;
}

.jump {
  animation: 1s jump infinite alternate;
}

.move {
  animation: 1s wiggle infinite linear;
}

.rotating {
  animation: 1s rotating;
}

.rotated {
  transform: rotate(145deg) translate(-50%, -50px);
}

@keyframes wiggle {

  10%,
  90% {
    transform: translate(-50%) translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate(-50%) translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate(-50%) translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate(-50%) translate3d(4px, 0, 0);
  }
}

@keyframes rotating {
  0% {
    transform: rotate(0deg) translate(-50%, 0);
  }

  100% {
    transform: rotate(145deg) translate(-50%, -50px);
  }
}

@keyframes jump {
  from {
    bottom: 0;
  }

  to {
    bottom: 20em;
  }
}
</style>
