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
  height: 80px;
  width: 80px;
  border-radius: 30px;
  background-color: #aaa;
  position: fixed;
  bottom: 50px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
