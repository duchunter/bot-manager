<template>
  <div id="app">
    <img src="./assets/logo.png">
    <button @click="camera">Take picture</button>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    camera: takePicture,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
