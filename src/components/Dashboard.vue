<template>
  <div class="container-fluid main-container">
    <bot-info :infoMode="infoMode" :bot="selectedBot"></bot-info>
    <top-nav></top-nav>
    <bot-list :botList="botList.filter(x => x.name)"></bot-list>
    <bottom-nav></bottom-nav>
  </div>
</template>

<script>
import TopNav from './TopNav';
import BottomNav from './BottomNav';
import BotInfo from './BotInfo';
import BotList from './BotList'
import { getBotInfo } from '../../utils/model';

export default {
  name: 'Dashboard',
  components: {
    TopNav,
    BottomNav,
    BotInfo,
    BotList,
  },

  mounted() {
    this.getBotList();
  },

  data() {
    return {
      infoMode: 'add',
      botList: [],
      selectedBot: {
        name: '',
        email: '',
        msg: '',
        start: '',
        stop: '',
      }
    }
  },

  methods: {
    getBotList() {
      this.botList = [];
      setTimeout(() => {
        let nameList = window.localStorage.getItem('bot_list');
        nameList && nameList.split(', ').forEach(name => {
          this.botList.push(getBotInfo(name));
        });
      }, 500);
    }
  }
}
</script>

<style>
.main-container {
  padding-top: 50px;
  padding-bottom: 50px;
}
</style>
