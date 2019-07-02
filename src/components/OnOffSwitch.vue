<template>
    <div class="onoffswitch">
        <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" :id="'myonoffswitch'+bossId" v-model="checked" v-bind="$attrs" @change="$emit('input', checked)">
        <label class="onoffswitch-label" :for="'myonoffswitch'+bossId">
            <span class="onoffswitch-inner"></span>
            <span class="onoffswitch-switch"></span>
        </label>
    </div>
</template>

<script>
import {mapGetters, mapState, mapActions, mapMutations} from 'vuex';

export default {
   name: 'OnOffSwitch',
   props: ['bossId'],
   inheritAttrs: false,
   components: {
  
   },
   data () {
       return{
           checked: true
       }
   },
   computed: {
       ...mapGetters([]),
       ...mapState([])
   },
   methods: {
       ...mapActions([]),
       ...mapMutations([]),
   },
   watch: {

   },
}
</script>

<style lang='scss' scoped>
.onoffswitch {
    position: relative; width: 62px;
    -webkit-user-select:none; -moz-user-select:none; -ms-user-select: none;
}
.onoffswitch-checkbox {
    display: none;
}
.onoffswitch-label {
    display: block; overflow: hidden; cursor: pointer;
    border: 2px solid #999999; border-radius: 20px;
}
.onoffswitch-inner {
    display: block; width: 200%; margin-left: -100%;
    transition: margin 0.3s ease-in 0s;
}
.onoffswitch-inner:before, .onoffswitch-inner:after {
    display: block; float: left; width: 50%; height: 24px; padding: 0; line-height: 24px;
    font-size: 16px; color: white; font-family: Trebuchet, Arial, sans-serif; font-weight: bold;
    box-sizing: border-box;
}
.onoffswitch-inner:before {
    content: "🔊";
    padding-left: 10px;
    background-color: #34A7C1; color: #FFFFFF;
}
.onoffswitch-inner:after {
    content: "🔇";
    padding-top: 1px;
    padding-right: 10px;
    background-color: #EEEEEE; color: #999999;
    text-align: right;
}
.onoffswitch-switch {
    display: block; width: 20px; margin: 3px;
    background: #FFFFFF;
    position: absolute; top: 0; bottom: 0;
    right: 34px;
    border: 2px solid #999999; border-radius: 20px;
    transition: all 0.3s ease-in 0s; 
}
.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner {
    margin-left: 0;
}
.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch {
    right: 0px; 
}
</style>
