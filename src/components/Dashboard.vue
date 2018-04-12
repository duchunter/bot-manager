<template>
  <div class="container-fluid container">
    <top-nav></top-nav>
    <bottom-nav></bottom-nav>
  </div>
</template>

<script>
import TopNav from './TopNav';
import BottomNav from './BottomNav';

export default {
  name: 'Dashboard',
  components: {
    TopNav,
    BottomNav,
  },

  data() {
    return {

    }
  },
}
</script>

<style>
.container {
  padding-top: 50px;
  padding-bottom: 50px;
}
</style>
