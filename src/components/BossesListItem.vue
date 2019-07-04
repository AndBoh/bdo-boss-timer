<template>
  <div class="bosses-list-item">
    {{bossName}} - {{bossRespawn}}
    <on-off-switch 
    v-model="alertOn"
    @click.native.stop />
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";

import OnOffSwitch from "./OnOffSwitch.vue";

export default {
  name: "BossesListItem",
  props: ["bossId", "bossName", "bossRespawn"],
  components: {
    OnOffSwitch
  },
  data() {
    return {
      alertOn: true
    };
  },
  computed: {},
  methods: {
    ...mapMutations([
      'SET_BOSS_ALERT'
    ]),
    loadAlertState() {
      let loadedAlert = localStorage.getItem("alertBoss" + this.bossId);
      if (loadedAlert === "false") {
        this.alertOn = false;
        this.SET_BOSS_ALERT({ bossId: this.bossId, alertOn: this.alertOn });
      }
    }
  },
  watch: {
    alertOn: function(val) {
      this.SET_BOSS_ALERT({bossId: this.bossId, alertOn: this.alertOn});
      localStorage.setItem("alertBoss" + this.bossId, this.alertOn);
    }
  },
  mounted() {
    this.loadAlertState();
  }
};
</script>

<style lang='scss' scoped>
</style>
