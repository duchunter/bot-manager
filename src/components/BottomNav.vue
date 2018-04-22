<template>
  <div>
    <nav class="navbar navbar-fixed-bottom">
      <div class="container-fluid">
        <button @click="handleLogin">Log in</button>
        <button @click="checkToken">Check token</button>
        <button @click="sendLogAway">Send log</button>
      </div>
    </nav>
  </div>
</template>

<script>
import { login, isLoggedIn } from '../../utils/auth';
import { sendLog } from '../../utils/api';

export default {
  name: 'TopNav',
  methods: {
    handleLogin: login,
    sendLogAway: sendLog,
    checkToken() {
      alert(`Access token: ${isLoggedIn() ? 'true' : 'false'}`);
    },
  }
}
</script>

<style scoped>

button {
  height: 50px;
  width: 33.33%;
  float: left;
  border-radius: 0;
  border: 0;
  background-color: #030303;
  color: white;
}

.navbar-fixed-top {
  border: 0;
  text-align: center;
}

.container-fluid {
  margin: 0;
  padding: 0;
}

</style>
