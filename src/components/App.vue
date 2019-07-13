<template>
  <div class="app">
    <boss-timer />
  </div>
</template>
 
<script>
import BossTimer from "./BossTimer.vue";

export default {
  name: "app",
  components: {
    BossTimer
  },
  data() {
    return {};
  }
};
</script>
 
<style lang='scss'>
* {
  box-sizing: border-box;
}
html {
  font-size: 16px;
  font-family: $main-font;
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
    0px 18px 23px rgba(0, 0, 0, 0.1);
  @media (max-width: $small-device-width) {
    font-size: 10px;
  }
  @media (max-width: $mid-device-width) and (min-width: $small-device-width) {
    font-size: 14px;
  }
}
.app {
  overflow: hidden;
}
</style>