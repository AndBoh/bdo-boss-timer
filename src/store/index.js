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

function timeToString(time) {
  let days = ~~(time / MS_Per_Day);
  time -= days * MS_Per_Day;
  let hours = ~~(time / MS_Per_Hour);
  time -= hours * MS_Per_Hour;
  let minutes = ~~(time / MS_Per_Minute);
  time -= minutes * MS_Per_Minute;
  let seconds = ~~(time / 1000);
  let result = "";
  if (days) {
    result += days + "д ";
  }
  if (hours) {
    result += hours + "ч ";
  }
  if (minutes < 10) {
    result += "0";
  }
  result += minutes + "м ";
  if (seconds < 10) {
    result += "0";
  }
  result += seconds + "с";
  return result;
}

export const store = new Vuex.Store({
  state: {
    bossShedule: [],
    time: null,
    activeBossId: null,
    minBeforeAlert: 1
  },
  getters: {
  },
  mutations: {
    SET_BOSS_SHEDULE(state, bossShedule) {
      state.bossShedule = bossShedule
    },
    COUNT_TIME_TO_RESPAWN(state) {
      let thisWeekBegin = getWeekBegin();
      let nextWeekBegin = getWeekBegin(1);
           state.bossShedule.forEach((boss, index) => {
               let bossRespawns = [];
               boss.bossRespawn.forEach(resp => {
                   bossRespawns.push(+thisWeekBegin+resp.day*MS_Per_Day+resp.hour*MS_Per_Hour+resp.min*MS_Per_Minute);
                   bossRespawns.push(+nextWeekBegin+resp.day*MS_Per_Day+resp.hour*MS_Per_Hour+resp.min*MS_Per_Minute);
               });
               
               bossRespawns = bossRespawns.filter((resp) => {
                   return (resp > +state.time);
               });
               Vue.set(state.bossShedule[index],'timeToRespawn',Math.min(...bossRespawns)-state.time);
               Vue.set(state.bossShedule[index],'timeToRespawnAsString',timeToString(Math.min(...bossRespawns)-state.time));
           });
    },
    LOAD_MIN_BEFORE_ALERT(state) {
      let min = localStorage.getItem('minBeforeAlert');
      if (min) {
        state.minBeforeAlert = min;
      }
    },
    UPDATE_TIME(state) {
      let date = new Date();
      state.time = date.getTime();
      state.time += (date.getTimezoneOffset()+180)*MS_Per_Minute;
    },
    SET_ACTIVE_BOSS_ID(state, id) {
      state.activeBossId = id;
    },
    SET_BOSS_ALERT(state, alertInfo) {
      state.bossShedule.find((boss) => {
        return boss.bossId == alertInfo.bossId
      }).alertOn = alertInfo.alertOn;
    },
    SET_MIN_BEFORE_ALERT(state, min) {
      if ((min >= 0) && (min <= 60)) {
        state.minBeforeAlert = min;
        localStorage.setItem('minBeforeAlert', min)
      }
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
                    hour: 20,
                    min: 31
                },
                {
                    day: 5,
                    hour: 21,
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