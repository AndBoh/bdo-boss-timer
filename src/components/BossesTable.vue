<template>
  <div class="table-wrapper">
    <table v-html="bossesTable" class="bosses-table">
      <tr />
      <th />
      <td />
    </table>
  </div>
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
      return Array.from(hours).sort((a, b) => {
        return a - b;
      });
    },
    bossesInTable() {
      return this.bossShedule.filter(boss => {
        return boss.inTable;
      });
    },
    bossesTable() {
      let result = "";
      for (let i = 0; i < 8; i++) {
        result += "<th class='head'>" + this.dayNames[i] + "</th>";
      }
      for (let i = 0; i < this.respHours.length; i++) {
        let hour = this.respHours[i].toString();
        result += "<tr>";
        while (hour.length < 2) {
          hour = "0" + hour;
        }
        result += "<td class='hour'>" + hour + ":00</td>";
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

<style lang='scss'>
.table-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
}
.bosses-table {
  width: 100%;
  border-collapse: collapse;
  background-color: rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(0, 0, 0, 0.1);
  .head,
  .hour {
    font-weight: bold;
    font-family: $accent-font;
  }
  td {
    padding: 10px 0;
    text-align: center;
    border-right: 2px solid rgba(0, 0, 0, 0.1);
  }
  tr:nth-child(odd) {
    background-color: rgba(0, 0, 0, 0.3);
  }
}
</style>
