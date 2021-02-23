<template>
  <div class="home-page">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>Welcome to The Vue Trivia App </h1>
    <router-link to="/QuizContainer"><button class="startBtn"><b>Play!</b></button></router-link>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
