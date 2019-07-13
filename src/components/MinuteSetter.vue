<template>
  <div class="min-before-alert">
    <button @click="SET_MIN_BEFORE_ALERT(minBeforeAlert-1)">-</button>
    <span class="minute-value">{{minBeforeAlert}}</span>
    <button @click="SET_MIN_BEFORE_ALERT(minBeforeAlert+1)">+</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "MinuteSetter",
  props: [""],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState(["minBeforeAlert"])
  },
  methods: {
    ...mapMutations(["SET_MIN_BEFORE_ALERT", "LOAD_MIN_BEFORE_ALERT"])
  },
  mounted() {
    this.LOAD_MIN_BEFORE_ALERT();
  }
};
</script>

<style lang='scss' scoped>
.min-before-alert {
  padding: 0 5px;
  button {
    outline: none;
    background-color: transparent;
    border: 1px solid $light-color;
    width: 25px;
    height: 25px;
    border-radius: 12px;
    color: $light-color;
    cursor: pointer;
    &:hover {
      border-color: $accent-color;
    }
  }
}
.minute-value {
  color: $accent-color;
}
</style>
