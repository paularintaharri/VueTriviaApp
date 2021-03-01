<template>
  <div id="boolean-answer-container">
    <button @click="selectAnswer('False')">False</button>
    <button @click="selectAnswer('True')">True</button>
  </div>
</template>

<script>
export default {
  name: "BooleanAnswerOptions",
  methods: {
    selectAnswer(answer) {
      this.$emit("selectAnswer", answer);
    },
  },
};
</script>

<style scoped>
#boolean-answer-container {
  padding: 0;
}

button {
  margin: 1em;
  padding: 0.5em;
  font-size: medium;
  font-weight: bold;
}
</style>
