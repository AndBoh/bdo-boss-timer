<template>
  <div class="btn-scroll-up" v-if="scrolled" @click="$parent.$refs.header.scrollIntoView()">▲</div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "BtnScrollUp",
  props: [""],
  components: {},
  data() {
    return {
      scrolled: false
    };
  },
  computed: {},
  methods: {
    getPageScroll() {
      this.scrolled = window.scrollY > 0;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.getPageScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.getPageScroll);
  }
};
</script>

<style lang='scss' scoped>
.btn-scroll-up {
  font-size: 3rem;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  background-color: $light-color;
  position: fixed;
  bottom: 50px;
  right: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  opacity: 0.4;
}
</style>
