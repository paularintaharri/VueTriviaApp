<template>
  <div class="home-page">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>Welcome to The Vue Trivia App</h1>
    <router-link to="/questions"><button class="playBtn"><b>Play!</b></button></router-link>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped>
.playBtn {
  background-color: rgba(53, 73, 94, 1);
  color: rgba(255, 255, 255, 1);
}
.playBtn:hover{
  background-color: rgb(90, 121, 155);
}
</style>
