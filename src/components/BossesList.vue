<template>
  <div class="bosses-list">
    <transition-group name="flip-list" class="flip-list" tag="div">
      <bosses-list-item key="-1" @click.native="setActiveBossId(null)" itemText="Расписание" />
      <bosses-list-item
        v-for="boss in getBossesSortedByRespawn"
        :bossId="boss.bossId"
        :key="boss.bossId"
        @click.native="setActiveBossId(boss.bossId)"
      />
    </transition-group>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import BossesListItem from "./BossesListItem.vue";

export default {
  name: "BossesList",
  props: [""],
  components: {
    BossesListItem
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getBossesSortedByRespawn"])
  },
  methods: {
    ...mapMutations(["SET_ACTIVE_BOSS_ID"]),
    setActiveBossId(bossId) {
      this.SET_ACTIVE_BOSS_ID(bossId);
      this.$parent.$refs.info.scrollIntoView();
    }
  }
};
</script>

<style lang='scss' scoped>
.bosses-list {
  width: 35%;
  flex-grow: 1;
  padding: 15px 25px;
  height: 100%;
  @media (max-width: $small-device-width) {
    width: 100%;
    height: 50%;
  }
}
.flip-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
}
.flip-list-move {
  transition: transform 1s;
}
</style>
