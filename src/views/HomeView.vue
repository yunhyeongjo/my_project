<template>
  <div class="home">
    <SampleCom/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import SampleCom from '@/components/SampleCom.vue'

export default {
  name: 'HomeView',
  components: {
    // HelloWorld
    SampleCom
  }
}
</script>
