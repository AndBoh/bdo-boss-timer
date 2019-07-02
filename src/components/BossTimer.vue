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
                @click.native="SET_ACTIVE_BOSS_ID(boss.bossId); 
                               $refs.info.scrollIntoView();"
                />
                
            </div>
            <div class="boss-info" ref="info">
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
           timer: null,
           alert: null
       }
   },
   computed: {
       ...mapGetters([
           'bossesInfo'
       ]),
       ...mapState([
           'bossShedule',
           'time',
           'activeBossId',
           'minBeforeAlert'
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
            this.checkRespawn();
        }, 1000);
       },

       checkRespawn() {
           if (this.bossesInfo.some((boss) => {
               let t = boss.bossRespawn - (MS_Per_Minute*this.minBeforeAlert);
               return (t <= 1000) && (t > 0) && (boss.bossAlertOn)
           })) {
               this.playAlert();
           }
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
       },

       loadAlert(fileName) {
           this.alert = new Audio(fileName);
       },

       playAlert() {
           this.alert.play();
       }
              
   },
   watch: {

   },
   mounted() {   
    this.loadBossShedule();
    this.UPDATE_TIME();
    this.loadAlert('assets/sound/sound.mp3');
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
    position: relative;
    @media (max-width: 600px) {
        flex-direction: column
    }
}

.bosses-list {
    width: 35%;
    flex-grow: 1;
    background-color: #aaa;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    @media (max-width: 600px) {
        width: 100%;
    }
}

.boss-info {
    width: 65%;
    flex-grow: 1;
    background-color: #555;
    @media (max-width: 600px) {
        width: 100%;
    }
}
</style>
