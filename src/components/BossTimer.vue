<template>
    <div class="boss-timer">
        <Header class="header">
            Header
        </Header>
        <Section class="main-section">
            <div class="bosses-list">
                <bosses-list-item 
                v-for="boss in bossesInfo"
                :bossId="boss.bossId"
                :bossName="boss.bossName"
                :bossRespawn="timeToString(boss.bossRespawn)"
                :key="boss.bossId"
                @click.native="SET_ACTIVE_BOSS_ID(boss.bossId)"
                />
                <!-- {{bossesInfo[0].bossName+' - '+timeToString(bossesInfo[0].bossRespawn)}} -->
            </div>
            <div class="boss-info">
                {{activeBossId}}
            </div>
        </Section>
        <Footer class="footer">
            Footer
        </Footer>
    </div>
</template>

<script>

const MS_Per_Minute = 1000*60;
const MS_Per_Hour = MS_Per_Minute*60;
const MS_Per_Day = MS_Per_Hour*24;

import {mapGetters, mapState, mapActions, mapMutations} from 'vuex';
import { setInterval } from 'timers';

import BossesListItem from './BossesListItem.vue'

export default {
   name: 'BossTimer',
   props: [''],
   components: {
       BossesListItem
   },
   data () {
       return{
           timer: null
       }
   },
   computed: {
       ...mapGetters([
           'bossesInfo'
       ]),
       ...mapState([
           'bossShedule',
           'time',
           'activeBossId'
       ]),
   },
   methods: {
       ...mapActions([
           'loadBossShedule'
       ]),
       ...mapMutations([
           'UPDATE_TIME',
           'SET_ACTIVE_BOSS_ID'
       ]),

       startTimer() {
        this.timer = setInterval(() => {
            this.UPDATE_TIME();
        }, 1000);
       },

       timeToString(time) {
           let days = ~~(time/MS_Per_Day);
           time -= days*MS_Per_Day;
           let hours = ~~(time/MS_Per_Hour);
           time -= hours*MS_Per_Hour;
           let minutes = ~~(time/MS_Per_Minute);
           time -= minutes*MS_Per_Minute;
           let seconds = ~~(time/1000);
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
.boss-timer {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    @media (max-width: 600px) {
        height: 200vh;
    }
    
}

.header {
    height: 50px;
}

.footer {
    height: 50px;
}

.main-section {
    flex-grow: 1;
    display: flex;
    @media (max-width: 600px) {
        flex-direction: column
    }
}

.bosses-list {
    flex-grow: 1;
    background-color: #aaa;
}

.boss-info {
    flex-grow: 3;
    background-color: #555;
    @media (max-width: 600px) {
        flex-grow: 1;
    }
}
</style>
