<template>
  <div class="bosses-list-item">
    {{getBossById(bossId).bossName}} - {{getBossById(bossId).timeToRespawnAsString}}
    <on-off-switch 
    v-model="alertOn"
    @click.native.stop />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import OnOffSwitch from "./OnOffSwitch.vue";

export default {
  name: "BossesListItem",
  props: ["bossId"],
  components: {
    OnOffSwitch
  },
  data() {
    return {
      alertOn: true
    };
  },
  computed: {
    ...mapState([
      'bossShedule'
    ])
  },
  methods: {
    ...mapMutations([
      'SET_BOSS_ALERT'
    ]),
    getBossById(bossId) {
      return this.bossShedule.find((boss) => {
        return boss.bossId === bossId;
      })
    },
    loadAlertState() {
      let loadedAlert = localStorage.getItem("alertBoss" + this.bossId);
      if (loadedAlert === "false") {
        this.alertOn = false;
        this.setBossAlert();
      }
    },
    saveAlertState() {
      localStorage.setItem("alertBoss" + this.bossId, this.alertOn);
    },
    setBossAlert() {
      this.SET_BOSS_ALERT({ bossId: this.bossId, alertOn: this.alertOn });
    }
  },
  watch: {
    alertOn: function(val) {
      this.setBossAlert();
      this.saveAlertState();
    }
  },
  mounted() {
    this.loadAlertState();
  }
};
</script>

<style lang='scss' scoped>
</style>
