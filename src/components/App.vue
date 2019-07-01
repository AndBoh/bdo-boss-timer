<template>
  <div class="app">
    <boss-timer/>
  </div>
</template>
 
<script>
import BossTimer from './BossTimer.vue'

export default {
  name: 'app',
  components: {
    BossTimer
  },
  data () {
    return {
      
    }
  }
}
</script>
 
<style lang='scss'>
  * {
    box-sizing: border-box;
  }
  .app {
    overflow: hidden;
  }
  
</style>