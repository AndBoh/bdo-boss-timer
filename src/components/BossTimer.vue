<template>
    <div class="boss-timer">
        {{new Date(time)}}
        {{timeToString(bossRespawnList[0].bossRespawn)}}
    </div>
</template>

<script>

const MS_Per_Minute = 1000*60;
const MS_Per_Hour = MS_Per_Minute*60;
const MS_Per_Day = MS_Per_Hour*24;

import {mapGetters, mapState, mapActions, mapMutations} from 'vuex';
import { setInterval } from 'timers';

export default {
   name: 'BossTimer',
   props: [''],
   components: {

   },
   data () {
       return{
           timer: null
       }
   },
   computed: {
       ...mapGetters([
           'bossRespawnList'
       ]),
       ...mapState([
           'bossShedule',
           'time'
       ]),
   },
   methods: {
       ...mapActions([
           'loadBossShedule'
       ]),
       ...mapMutations([
           'UPDATE_TIME'
       ]),

       startTimer() {
        this.timer = setInterval(() => {
            this.UPDATE_TIME();
        }, 1000);
       },

       timeToString(time) {
           let days = Math.floor(time/MS_Per_Day);
           time -= days*MS_Per_Day;
           let hours = Math.floor(time/MS_Per_Hour);
           time -= hours*MS_Per_Hour;
           let minutes = Math.floor(time/MS_Per_Minute);
           time -= minutes*MS_Per_Minute;
           let seconds = Math.floor(time/1000);
           let result = '';
           if (days) {
               result += days+'д ';
           }
           if (hours) {
               result += hours+'ч ';
           }
           if (minutes < 10) {
               result += '0';
           }
           result += minutes+'м ';
           if (seconds < 10) {
               result += '0';
           }
           result += seconds+'с';
           return result;
       }
              
   },
   watch: {

   },
   mounted() {   
    this.loadBossShedule();
    this.UPDATE_TIME();
    this.startTimer();
   }
}
</script>

<style lang='scss' scoped>

</style>
