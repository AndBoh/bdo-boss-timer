<template>
  <div class="boss-timer">
    <Header class="header">
      <div class="min-before-alert">
        <button @click="SET_MIN_BEFORE_ALERT(minBeforeAlert-1)">-</button>
        <input type="text" 
        :value="minBeforeAlert" 
        disabled />
        <button @click="SET_MIN_BEFORE_ALERT(minBeforeAlert+1)">+</button>
      </div>
    </Header>
    <Section class="main-section">
      <div class="bosses-list">
        <transition-group name="flip-list" class="flip-list" tag="div">
          <div
            class="bosses-list-btn"
            key="-1"
            @click="SET_ACTIVE_BOSS_ID(null); 
                    $refs.info.scrollIntoView();">
                Расписание респа
          </div>
          <bosses-list-item
            class="bosses-list-btn"
            v-for="boss in sortedBossesbyRespawn"
            :bossId="boss.bossId"
            :bossName="boss.bossName"
            :bossRespawn="timeToString(boss.bossRespawn)"
            :key="boss.bossId"
            @click.native="SET_ACTIVE_BOSS_ID(boss.bossId); 
                            $refs.info.scrollIntoView();"
          />
        </transition-group>
      </div>
      <div class="boss-info-wrapper" ref="info">
        <div class="bosses-table" v-if="activeBossId === null">
          <table v-html="bossesTable"></table>
        </div>
        <div class="boss-info" v-else>{{activeBossId}}</div>
      </div>
    </Section>
    <Footer class="footer">Footer</Footer>
  </div>
</template>

<script>
const MS_Per_Minute = 1000 * 60;
const MS_Per_Hour = MS_Per_Minute * 60;
const MS_Per_Day = MS_Per_Hour * 24;

import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import { setInterval } from "timers";

import BossesListItem from "./BossesListItem.vue";

export default {
  name: "BossTimer",
  props: [""],
  components: {
    BossesListItem
  },
  data() {
    return {
      timer: null,
      alert: null,
      dayNames: ["", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
    };
  },
  computed: {
    ...mapGetters(["bossesInfo"]),
    ...mapState(["bossShedule", "time", "activeBossId", "minBeforeAlert"]),
    sortedBossesbyRespawn() {
      return this.bossesInfo.sort(function(boss1, boss2) {
        if (boss1.bossRespawn > boss2.bossRespawn) {
          return 1;
        } else {
          return -1;
        }
      });
    },
    respHours() {
      let hours = new Set();
      this.bossesInTable.forEach(boss => {
        boss.bossRespawn.forEach(resp => {
          hours.add(resp.hour);
        });
      });
      return Array.from(hours).sort();
    },
    bossesInTable() {
      return this.bossShedule.filter(boss => {
        return boss.inTable;
      });
    },
    bossesTable() {
      let result = "";
      for (let i = 0; i < 8; i++) {
        result += "<th>" + this.dayNames[i] + "</th>";
      }
      for (let i = 0; i < this.respHours.length; i++) {
        const hour = this.respHours[i];
        result += "<tr>";
        result += "<td>" + hour + "</td>";
        for (let i = 1; i < 8; i++) {
          result += "<td>";
          let bosses = this.bossesInTable.map(boss => {
            if (
              boss.bossRespawn.some(resp => {
                return resp.hour == hour && resp.day == i;
              })
            ) {
              return boss.bossName;
            }
          });
          bosses = bosses.filter(boss => {
            return boss;
          });
          result += bosses.join("/");
          result += "</td>";
        }
        result += "</tr>";
      }
      return result;
    }
  },
  methods: {
    ...mapActions(["loadBossShedule"]),
    ...mapMutations([
      "UPDATE_TIME",
      "SET_ACTIVE_BOSS_ID",
      "SET_MIN_BEFORE_ALERT",
      "LOAD_MIN_BEFORE_ALERT"
    ]),

    startTimer() {
      this.timer = setInterval(() => {
        this.UPDATE_TIME();
        this.checkRespawn();
      }, 1000);
    },

    checkRespawn() {
      if (
        this.bossesInfo.some(boss => {
          let t = boss.bossRespawn - MS_Per_Minute * this.minBeforeAlert;
          return t <= 1000 && t > 0 && boss.bossAlertOn;
        })
      ) {
        this.playAlert();
      }
    },

    timeToString(time) {
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
    },

    loadAlert(fileName) {
      this.alert = new Audio(fileName);
    },

    playAlert() {
      this.alert.play();
    }
  },
  watch: {},
  mounted() {
    this.loadBossShedule();
    this.LOAD_MIN_BEFORE_ALERT();
    this.UPDATE_TIME();
    this.loadAlert("assets/sound/sound.mp3");
    this.startTimer();
  }
};
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
    flex-direction: column;
  }
}

.bosses-list {
  width: 35%;
  flex-grow: 1;
  background-color: #aaa;
  @media (max-width: 600px) {
    width: 100%;
  }
}

.bosses-list-btn {
  border: 1px solid red;
  cursor: pointer;
}

.boss-info-wrapper {
  width: 65%;
  flex-grow: 1;
  background-color: #555;
  @media (max-width: 600px) {
    width: 100%;
  }
}

.flip-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.flip-list-move {
  transition: transform 1s;
}
</style>
