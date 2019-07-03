<template>
  <div class="bosses-list-item">
    {{bossName}} - {{bossRespawn}}
    <on-off-switch 
    :bossId="bossId" 
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
    return {};
  },
  computed: {},
  methods: {
    ...mapMutations([])
  },
  watch: {}
};
</script>

<style lang='scss' scoped>
</style>
