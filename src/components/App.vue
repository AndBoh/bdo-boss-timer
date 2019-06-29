<template>
  <div class="app">
    <boss-shedule/>
  </div>
</template>
 
<script>
import BossShedule from './BossShedule.vue'

export default {
  name: 'app',
  components: {
    BossShedule
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
  
</style>