import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const MS_Per_Minute = 1000*60;
const MS_Per_Hour = MS_Per_Minute*60;
const MS_Per_Day = MS_Per_Hour*24;

function getWeekBegin(weekOffset = 0) {
  let today = new Date();
  let weekBegin = new Date(today.getFullYear(),today.getMonth(),today.getDate()-((today.getDay() || 7)));
  weekBegin.setDate(weekBegin.getDate()+7*weekOffset);
  return weekBegin;
}

export const store = new Vuex.Store({
  state: {
    bossShedule: [],
    time: null,
    activeBossId: null,
    minBeforeAlert: 1
  },
  getters: {
    bossesInfo(state) {
      let bossesInfo = [];
           let thisWeekBegin = getWeekBegin();
           let nextWeekBegin = getWeekBegin(1);
           state.bossShedule.forEach(boss => {
               let bossRespawns = [];
               boss.bossRespawn.forEach(resp => {
                   bossRespawns.push(+thisWeekBegin+resp.day*MS_Per_Day+resp.hour*MS_Per_Hour+resp.min*MS_Per_Minute);
                   bossRespawns.push(+nextWeekBegin+resp.day*MS_Per_Day+resp.hour*MS_Per_Hour+resp.min*MS_Per_Minute);
               });
               
               bossRespawns = bossRespawns.filter((resp) => {
                   return (resp > +state.time);
               });

               bossesInfo.push({
                   bossId: boss.bossId,
                   bossName: boss.bossName,
                   bossAlertOn: boss.alertOn,
                   bossRespawn: Math.min(...bossRespawns)-state.time
               });
           });
           return bossesInfo;
    }
  },
  mutations: {
    SET_BOSS_SHEDULE(state, bossShedule) {
      state.bossShedule = bossShedule
      if (state.bossShedule && (state.activeBossId === null)) {
        state.activeBossId = 0;
      }
    },
    UPDATE_TIME(state) {
      state.time = Date.now();
    },
    SET_ACTIVE_BOSS_ID(state, id) {
      state.activeBossId = id;
    },
    SET_BOSS_ALERT(state, alertInfo) {
      state.bossShedule.find((boss) => {
        return boss.bossId == alertInfo.bossId
      }).alertOn = alertInfo.alertOn;
    }
  },
  actions: {
    loadBossShedule(context) {
      let shedule 
      // AJAX
      shedule = [
        {
            bossId: 0,
            bossName: 'Kzarka',
            inTable: true,
            alertOn: true,
            bossRespawn: [
                {
                    day: 1,
                    hour: 13,
                    min: 0,
                },
                {
                    day: 3,
                    hour: 20,
                    min: 0
                }
            ]
        },
        {
            bossId: 1,
            bossName: 'Offin',
            inTable: true,
            alertOn: true,
            bossRespawn: [
                {
                    day: 2,
                    hour: 17,
                    min: 20
                },
                {
                    day: 7,
                    hour: 20,
                    min: 0
                }
            ]
        }
    ];
      context.commit('SET_BOSS_SHEDULE', shedule)  
    }
  },
  modules: {

  },
});