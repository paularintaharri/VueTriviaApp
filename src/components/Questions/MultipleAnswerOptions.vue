<template>
  <ul>
    <li v-for="answer of answerOptions" :key="answer">
      <button @click="selectAnswer(answer)">{{ answer }}</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "MultipleAnswerOptions",
  props: {
    answerOptions: Array,
  },
  methods: {
    selectAnswer(answer) {
      this.$emit("selectAnswer", answer);
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
button {
  margin: 1em;
  padding: 0.5em;
  font-size: medium;
  font-weight: bold;
}
</style>
