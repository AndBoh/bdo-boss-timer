<template>
    <div class="bosses-list-item">
        {{bossName}} - {{bossRespawn}}
    </div>
</template>

<script>
import {mapGetters, mapState, mapActions, mapMutations} from 'vuex';

export default {
   name: 'BossesListItem',
   props: [
       'bossId',
       'bossName',
       'bossRespawn'
   ],
   components: {
  
   },
   data () {
       return{

       }
   },
   computed: {
   },
   methods: {

   },
   watch: {

   },
}
</script>

<style lang='scss' scoped>
.bosses-list-item {
    border: 1px solid red;
    cursor: pointer;
}
</style>
