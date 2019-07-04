<template>
  <div class="onoffswitch">
    <label class="onoffswitch-label">
      <input
        type="checkbox"
        class="onoffswitch-checkbox"
        :checked="checked"
        @change="change($event)"
      />
      <span class="onoffswitch-inner"></span>
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
}
.onoffswitch-checkbox {
  display: none;
}
.onoffswitch-label {
  display: block;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid #999999;
  border-radius: 20px;
}
.onoffswitch-inner {
  display: block;
  width: 200%;
  margin-left: -100%;
  transition: margin 0.3s ease-in 0s;
}
.onoffswitch-inner:before,
.onoffswitch-inner:after {
  display: block;
  float: left;
  width: 50%;
  height: 24px;
  padding: 0;
  line-height: 24px;
  font-size: 16px;
  color: white;
  font-family: Trebuchet, Arial, sans-serif;
  font-weight: bold;
  box-sizing: border-box;
  text-align: center;
}
.onoffswitch-inner:before {
  content: "🔊";
  background-color: #34a7c1;
  color: #ffffff;
}
.onoffswitch-inner:after {
  content: "🔇";
  padding-top: 1px;
  background-color: #eee;
  color: #999999;
}

.onoffswitch-checkbox:checked + .onoffswitch-inner {
  margin-left: 0;
}
</style>
