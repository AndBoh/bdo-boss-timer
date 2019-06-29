<template>
    <div class="boss-shedule">
        {{time}}
        {{bossNextRespawn}}
    </div>
</template>

<script>

const MS_Per_Hour = 1000*60*60;
const MS_Per_Day = MS_Per_Hour*24;

import {mapGetters, mapState, mapActions, mapMutations} from 'vuex';
import { setInterval } from 'timers';

function getWeekBegin(weekOffset = 0) {
    let today = new Date();
    let weekBegin = new Date(today.getFullYear(),today.getMonth(),today.getDate()-((today.getDay() || 7)));
    weekBegin.setDate(weekBegin.getDate()+7*weekOffset);
    return weekBegin;
}

export default {
   name: 'BossShedule',
   props: [''],
   components: {

   },
   data () {
       return{
           timer: undefined,
           shedule: [],
           time: Date.now(),
       }
   },
   computed: {
       ...mapGetters([]),
       ...mapState([]),
       bossNextRespawn() {
           let bossRespawnList = [];
           let thisWeekBegin = getWeekBegin();
           let nextWeekBegin = getWeekBegin(1);
           this.shedule.forEach(boss => {
               let bossRespawns = [];
               boss.bossRespawn.forEach(resp => {
                   bossRespawns.push(+thisWeekBegin+resp.day*MS_Per_Day+resp.hour*MS_Per_Hour);
                   bossRespawns.push(+nextWeekBegin+resp.day*MS_Per_Day+resp.hour*MS_Per_Hour);
               });
               
               bossRespawns = bossRespawns.filter((resp) => {
                   return (resp > +this.time);
               })
               
               bossRespawns.sort();
               bossRespawnList.push({
                   bossId: boss.bossId,
                   bossRespawn: bossRespawns[0]-this.time
               })
           });
           return bossRespawnList;
       }
   },
   methods: {
       ...mapActions([]),
       ...mapMutations([]),
       updateTime() {
           this.time = Date.now();
       }
   },
   watch: {

   },
   mounted() {
    //    AJAX подгрузка с сервера
    this.shedule = [
        {
            bossId: 0,
            bossRespawn: [
                {
                    day: 1,
                    hour: 13
                },
                {
                    day: 3,
                    hour: 20
                }
            ]
        },
        {
            bossId: 1,
            bossRespawn: [
                {
                    day: 2,
                    hour: 15
                },
                {
                    day: 7,
                    hour: 20
                }
            ]
        }
    ];
    
    this.timer = setInterval(() => {
        this.updateTime();
    }, 1000)
   }
}
</script>

<style lang='scss' scoped>

</style>
