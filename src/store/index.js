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
    time: null
  },
  getters: {
    bossRespawnList(state) {
      let bossRespawnList = [];
           let thisWeekBegin = getWeekBegin();
           let nextWeekBegin = getWeekBegin(1);
           state.bossShedule.forEach(boss => {
               let bossRespawns = [];
               boss.bossRespawn.forEach(resp => {
                   bossRespawns.push(+thisWeekBegin+resp.day*MS_Per_Day+resp.hour*MS_Per_Hour);
                   bossRespawns.push(+nextWeekBegin+resp.day*MS_Per_Day+resp.hour*MS_Per_Hour);
               });
               
               bossRespawns = bossRespawns.filter((resp) => {
                   return (resp > +state.time);
               });

               bossRespawnList.push({
                   bossId: boss.bossId,
                   bossRespawn: Math.min(...bossRespawns)-state.time
               });
           });
           return bossRespawnList;
    }
  },
  mutations: {
    SET_BOSS_SHEDULE(state, bossShedule) {
      state.bossShedule = bossShedule
    },
    UPDATE_TIME(state) {
      state.time = Date.now();
    }
  },
  actions: {
    loadBossShedule(context) {
      let shedule 
      // AJAX
      shedule = [
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
      context.commit('SET_BOSS_SHEDULE', shedule)  
    }
  },
  modules: {

  },
});