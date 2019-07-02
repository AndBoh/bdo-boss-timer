<template>
        <div class="bosses-list-item">
            {{bossName}} - {{bossRespawn}}
            <on-off-switch 
            :bossId="bossId"
            @click.native.stop
            v-model="alertOn"
            />
        </div>
</template>

<script>
import {mapGetters, mapState, mapActions, mapMutations} from 'vuex';

import OnOffSwitch from './OnOffSwitch.vue'

export default {
   name: 'BossesListItem',
   props: [
       'bossId',
       'bossName',
       'bossRespawn'
   ],
   components: {
       OnOffSwitch
   },
   data () {
       return{
           alertOn: true
       }
   },
   computed: {
   },
   methods: {
       ...mapMutations([
           'SET_BOSS_ALERT'
       ])
   },
   watch: {
       alertOn() {
           this.SET_BOSS_ALERT({bossId:this.bossId, alertOn: this.alertOn})
        // console.log("bossId"+this.bossId+"alertOn"+this.alertOn)
       }
   },
}
</script>

<style lang='scss' scoped>
.bosses-list-item {
    border: 1px solid red;
    cursor: pointer;
}
</style>
