<template>
  <div class="bosses-list-item effect5">
    <div class="boss-item-wrapper" v-if="bossId != undefined">
      <img :src="bossPicLink" class="boss-pic" />
      <div class="text-wrapper">
        <div class="boss-name">{{getBossById(bossId).bossName}}</div>
        <div class="boss-resp-time">{{getBossById(bossId).timeToRespawnAsString}}</div>
      </div>
      <on-off-switch v-model="alertOn" @click.native.stop textOn="&#x1F50A;" textOff="&#x1F507;" />
    </div>
    <div class="custom-item-wrapper" v-else v-html="itemText"></div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

import OnOffSwitch from "./OnOffSwitch.vue";

export default {
  name: "BossesListItem",
  props: ["bossId", "itemText", "itemImg"],
  components: {
    OnOffSwitch
  },
  data() {
    return {
      alertOn: true
    };
  },
  computed: {
    ...mapState(["bossShedule"]),
    ...mapGetters(["getBossById"]),
    bossPicLink() {
      return "assets/img/" + this.bossId + ".png";
    }
  },
  methods: {
    ...mapMutations(["SET_BOSS_ALERT"]),
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
  background: rgba(0, 0, 0, 0.2);
  height: 6vh;
  font-size: 0.8rem;
  position: relative;
  border-radius: 10px;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
  &:hover {
    color: $accent-color;
    border-color: $accent-color;
  }
}
.boss-item-wrapper,
.custom-item-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 0 25px;
}
.custom-item-wrapper {
  justify-content: center;
}
.boss-pic {
  height: 95%;
}
.boss-name,
.custom-item-wrapper {
  font-size: 1.5rem;
  @media (max-width: $mid-device-width) and (min-width: $small-device-width) {
    font-size: 1.2rem;
  }
}
.boss-resp-time {
  font-size: 1.1rem;
  @media (max-width: $mid-device-width) and (min-width: $small-device-width) {
    font-size: 0.9rem;
  }
}
.text-wrapper {
  display: flex;
  flex-grow: 1;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  @media (max-width: $mid-device-width) and (min-width: $small-device-width) {
    flex-direction: column;
  }
}
</style>
