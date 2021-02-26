<template>
  <div class="home-page">
    <img alt="Vue logo" src="../../assets/logo.png" />
    <h1>Welcome to The Vue Trivia App</h1>
    <button class="playBtn" @click="startTrivia">Play!</button>
    <br />
    <settings @settings="saveSettings" />
  </div>
</template>

<script>
import Settings from "./Settings.vue";

export default {
  components: { Settings },
  name: "HomePage",
  data() {
    return {
      APIProps: {},
    };
  },
  methods: {
    startTrivia() {
      this.$router.push({
        name: "QuestionPage",
        params: {
          APIProps: this.APIProps,
        },
      });
    },
    saveSettings(settingsObj) {
      if (settingsObj) {
        console.log("changed settings");
        this.APIProps = settingsObj;
      }
    },
  },
};
</script>

<style scoped>
button {
  background-color: #35495e;
  color: #ffffff;
  margin: 1em;
  padding: 0.5em;
  font-size: medium;
  font-weight: bold;
}
.playBtn:hover {
  background-color: #5a799b;
}
</style>
