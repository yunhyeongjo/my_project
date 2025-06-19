<template>
  <div id="bbdoy">
    <BgmPlayer />
    <div class="next-wrapper">
      <img src="@/assets/background2.jpg" alt="Background" class="bg-image" />
    </div>
  </div>
</template>

<script setup>

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
</style>
