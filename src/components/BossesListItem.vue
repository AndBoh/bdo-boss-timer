<template>
  <div class="bosses-list-item">
    <div class="boss-item-wrapper" v-if="bossId != undefined">
      {{getBossById(bossId).bossName}} - {{getBossById(bossId).timeToRespawnAsString}}
      <on-off-switch 
        v-model="alertOn"
        @click.native.stop />
    </div>
    <div class="custom-item-wrapper" v-else></div>
    {{itemText}}
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

import OnOffSwitch from "./OnOffSwitch.vue";

export default {
  name: "BossesListItem",
  props: ["bossId","itemText","itemImg"],
  components: {
    OnOffSwitch
  },
  data() {
    return {
      alertOn: true
    };
  },
  computed: {
    ...mapState(['bossShedule']),
    ...mapGetters(['getBossById'])
  },
  methods: {
    ...mapMutations(['SET_BOSS_ALERT']),
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
.bosses-list-item {
  border: 1px solid red;
  cursor: pointer;
}
</style>
