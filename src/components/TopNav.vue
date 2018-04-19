<template>
  <div>
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand">Bot Manager</a>
          <button class="btn btn-danger"
                  @click="addBot"
                  data-toggle="modal"
                  data-target="#bot-info-modal">
            Add new bot
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'TopNav',
  methods: {
    addBot() {
      this.$parent.infoMode = 'add';
    }
  }
}
</script>

<style scoped>
button {
  height: 50px;
  float: right;
}

.navbar-fixed-top {
  border: 0;
}

</style>
