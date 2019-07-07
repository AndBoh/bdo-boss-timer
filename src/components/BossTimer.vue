<template>
  <div class="boss-timer">
    <header class="header" ref="header">
      <minute-setter />
    </header>
    <section class="main-section">
      <bosses-list />
      <div class="boss-info-wrapper" ref="info">
        <bosses-table v-if="activeBossId === null" />
        <div class="boss-info" v-else>
          {{activeBoss}}
        </div>
      </div>
    </section>
    <footer class="footer">Footer</footer>
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
    },

    playAlert() {
      this.alert.play();
    }
  },
  watch: {},
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
.boss-info-wrapper {
  width: 65%;
  flex-grow: 1;
  background-color: #555;
  @media (max-width: 600px) {
    width: 100%;
  }
}
</style>
