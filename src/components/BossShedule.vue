<template>
    <div class="boss-shedule">
        {{time}}
        {{bossRespawnList}}
    </div>
</template>

<script>



import {mapGetters, mapState, mapActions, mapMutations} from 'vuex';
import { setInterval } from 'timers';



export default {
   name: 'BossShedule',
   props: [''],
   components: {

   },
   data () {
       return{
           timer: null
       }
   },
   computed: {
       ...mapGetters([
           'bossRespawnList'
       ]),
       ...mapState([
           'bossShedule',
           'time'
       ]),
   },
   methods: {
       ...mapActions([
           'loadBossShedule'
       ]),
       ...mapMutations([
           'UPDATE_TIME'
       ]),

       startTimer() {
        this.timer = setInterval(() => {
            this.UPDATE_TIME();
        }, 1000)
       }
       
   },
   watch: {

   },
   mounted() {   
    this.loadBossShedule();
    this.UPDATE_TIME();
    this.startTimer();
   }
}
</script>

<style lang='scss' scoped>

</style>
