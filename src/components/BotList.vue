<template>
  <div>
    <p v-if="botList.length == 0" style="text-align:center">
      Nothing here
    </p>
    <!-- A lot of buttons -->
    <transition-group class="container-fluid" name="list" tag="div">
      <div class="col-xs-4 btn list-item"
           @click="displayBotInfo(index)"
           data-toggle="modal"
           data-target="#bot-info-modal"
           v-for="(bot, index) in botList"
           :class="isActive(bot) ? 'btn-primary' : 'btn-danger'"
           :key="index">
        <h4>{{ bot.name }}</h4>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'BotList',
  props: ['botList'],
  methods: {
    // Display info
    displayBotInfo(index) {
      this.$parent.infoMode = 'info';
      for (let key in this.botList[index]) {
        this.$parent.selectedBot[key] = this.botList[index][key];
      }
    },

    isActive(bot) {
      return bot.stop && bot.stop > new Date().getTime();
    }
  }
}

</script>

<style scoped>

.list-move {
  transition: transform 0.2s;
}

.list-item {
  transition: all 0.2s;
  margin-bottom: 1vh;
  border: 2px solid;
  height: 50px;
  width: 100%;
  text-align: center;
}

.list-enter, .row-list-leave-to
/* .header-list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-leave-active {
  position: absolute;
}

</style>
