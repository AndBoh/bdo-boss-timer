<template>
  <table v-html="bossesTable" class="bosses-table" />
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "BossesTable",
  props: [""],
  components: {},
  data() {
    return {
      dayNames: ["", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
    };
  },
  computed: {
    ...mapState(["bossShedule"]),
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
  methods: {}
};
</script>

<style lang='scss' scoped>
.bosses-table {
  border: 1px solid #000;
}
</style>
