<template>
  <div class="boss-timer">
    <header class="header" ref="header">
      <span class="logo">BDO Boss Timer</span>
      <span class="min-setter">
        Уведомление за
        <minute-setter />минут
      </span>
    </header>
    <section class="main-section">
      <bosses-list />
      <div class="boss-info-wrapper" ref="info">
        <bosses-table v-if="activeBossId === null" />
        <div class="boss-info" v-else>
          <img :src="activeBossPic" class="boss-pic" />
          <div class="boss-name">{{activeBoss.bossName}}</div>
          <div class="time-to-respawn">{{activeBoss.timeToRespawnAsString}}</div>
          <div class="boss-info-item" v-if="activeBoss.channels">
            <div class="item-name">Каналы</div>
            <div class="item-value">{{activeBoss.channels}}</div>
          </div>
          <div class="boss-info-item" v-if="activeBoss.location">
            <div class="item-name">Локация</div>
            <div class="item-value">{{activeBoss.location}}</div>
          </div>
          <div class="boss-info-item" v-if="activeBoss.penalty">
            <div class="item-name">Штрафы при смерти</div>
            <div class="item-value">{{activeBoss.penalty}}</div>
          </div>
          <div class="boss-info-item" v-if="activeBoss.description">
            <div class="item-name">Описание</div>
            <div class="item-value">{{activeBoss.description}}</div>
          </div>
          <!-- {{activeBoss}} -->
        </div>
      </div>
    </section>
    <footer class="footer">
      Created by&nbsp;
      <a target="_blank" href="https://github.com/AndBoh">Andrey Bokhan</a>
    </footer>
    <btn-scroll-up />
  </div>
</template>

<script>
const MS_Per_Minute = 1000 * 60;

import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import { setInterval } from "timers";

import MinuteSetter from "./MinuteSetter.vue";
import BossesList from "./BossesList.vue";
import BossesTable from "./BossesTable.vue";
import BtnScrollUp from "./BtnScrollUp.vue";

export default {
  name: "BossTimer",
  props: [""],
  components: {
    MinuteSetter,
    BossesList,
    BossesTable,
    BtnScrollUp
  },
  data() {
    return {
      timer: null,
      alert: null
    };
  },
  computed: {
    ...mapState(["bossShedule", "activeBossId", "minBeforeAlert"]),
    ...mapGetters(["getBossById"]),
    activeBoss() {
      return this.getBossById(this.activeBossId);
    },
    activeBossPic() {
      return "assets/img/" + this.activeBossId + ".png";
    }
  },
  methods: {
    ...mapActions(["loadBossShedule"]),
    ...mapMutations(["UPDATE_TIME", "COUNT_TIME_TO_RESPAWN"]),

    startTimer() {
      this.timer = setInterval(() => {
        this.UPDATE_TIME();
        this.COUNT_TIME_TO_RESPAWN();
        this.checkRespawn();
      }, 1000);
    },

    checkRespawn() {
      if (
        this.bossShedule.some(boss => {
          let t = boss.timeToRespawn - MS_Per_Minute * this.minBeforeAlert;
          return t <= 1000 && t > 0 && boss.alertOn;
        })
      ) {
        this.playAlert();
      }
    },

    loadAlert(fileName) {
      this.alert = new Audio(fileName);
      this.alert.load();
    },

    playAlert() {
      this.alert.play();
    }
  },
  watch: {},
  beforeMount() {},
  mounted() {
    this.loadBossShedule();
    this.UPDATE_TIME();
    this.COUNT_TIME_TO_RESPAWN();
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
  color: $main-font-color;
  background-image: url("../assets/img/bg.jpg");
  background-size: cover;
  background-position: center;
  @media (max-width: $small-device-width) {
    height: 200vh;
  }
}
.header {
  color: $light-color;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.7);
}
.logo {
  font-size: 1.6rem;
  font-family: $logo-font;
  @media (max-width: $small-device-width) {
    font-size: 1.2rem;
  }
}
.min-setter {
  display: flex;
  align-items: center;
}
.footer {
  color: $light-color;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  z-index: 1;
  font-size: 0.8rem;
  padding: 5px;
  opacity: 0.6;
  a {
    color: $light-color;
    &:hover{
      color: $main-font-color;
    }
  }
}
.main-section {
  flex-grow: 1;
  display: flex;
  position: relative;
  @media (max-width: $small-device-width) {
    flex-direction: column;
  }
}
.boss-info-wrapper {
  width: 65%;
  flex-grow: 1;
  position: relative;
  padding: 20px;
  @media (max-width: $small-device-width) {
    width: 100%;
    height: 50%;
  }
  @media (max-width: $mid-device-width) {
    padding: 5px;
  }
}
.boss-info {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  .boss-pic {
    height: 30vh;
    opacity: 0.9;
  }
  .boss-name {
    font-size: 3rem;
    font-family: $accent-font;
  }
  .boss-info-item {
    width: 100%;
    font-size: 1.3rem;
    display: flex;
    position: relative;
    border-bottom: 2px solid rgba(255, 255, 255, 0.1);
    &:last-child {
      border-bottom: none;
    }
    .item-name {
      font-family: $accent-font;
      color: $light-color;
      width: 30%;
      text-align: right;
      padding-right: 20px;
    }
    .item-value {
      width: 70%;
    }
  }
  .time-to-respawn {
    font-size: 2.5rem;
    font-family: $logo-font;
    color: $accent-color;
  }
}
</style>
