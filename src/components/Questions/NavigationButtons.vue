<template>
  <div id="button-container">
    <button v-show="showPreviousButton" @click="previousQuestion">Previous</button>
    <button v-show="showNextButton" @click="nextQuestion">Next</button>
  </div>
</template>

<script>
export default {
  name: "NavigationButtons",
  props: {
    questionIndex: Number,
    questionsLength: Number,
  },
  computed: {
    showPreviousButton: function () {
      return this.questionIndex > 0;
    },
    showNextButton: function () {
      return this.questionIndex < this.questionsLength - 1;
    },
  },
  methods: {
    previousQuestion() {
      this.$emit("navigateQuestions", -1);
    },
    nextQuestion() {
      this.$emit("navigateQuestions", 1);
    },
  },
};
</script>

<style scoped>
button {
  background-color: #45607c;
  color: #ffffff;
  margin: 1em;
  padding: 0.5em;
  font-size: medium;
  font-weight: bold;
}
#button-container {
  margin: 0 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
