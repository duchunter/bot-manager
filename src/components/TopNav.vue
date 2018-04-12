<template>
  <div>
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button class="btn btn-danger">
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
