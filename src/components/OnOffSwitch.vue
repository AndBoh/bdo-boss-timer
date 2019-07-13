<template>
  <div class="onoffswitch">
    <label class="onoffswitch-label">
      <input
        type="checkbox"
        class="onoffswitch-checkbox"
        :checked="checked"
        @change="change($event)"
      />
      <span class="switch-inner">
        <span class="on-state" v-html="textOn"></span>
        <span class="off-state" v-html="textOff"></span>
      </span>
    </label>
  </div>
</template>

<script>
export default {
  name: "OnOffSwitch",
  model: {
    prop: "checked",
    event: "change"
  },
  props: {
    checked: {
      default: false
    },
    textOn: {
      default: "ON"
    },
    textOff: {
      default: "OFF"
    }
  },
  data() {
    return {};
  },
  methods: {
    change(event) {
      this.$emit("change", event.target.checked);
    }
  }
};
</script>

<style lang='scss' scoped>
.onoffswitch {
  position: relative;
  width: 50px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  opacity: 0.7;
}
.onoffswitch-checkbox {
  display: none;
}
.onoffswitch-label {
  display: block;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid $light-color;
  border-radius: 20px;
}
.on-state,
.off-state {
  display: block;
  float: left;
  height: 24px;
  width: 50%;
  line-height: 24px;
  font-size: 16px;
  color: $main-font-color;
  font-family: Trebuchet, Arial, sans-serif;
  font-weight: bold;
  box-sizing: border-box;
  text-align: center;
}
.off-state {
  background-color: $light-color;
}
.on-state {
  background-color: $dark-color;
}
.switch-inner {
  display: block;
  width: 200%;
  margin-left: -100%;
  transition: margin 0.3s ease-in 0s;
}
.onoffswitch-checkbox:checked + .switch-inner {
  margin-left: 0;
}
</style>
