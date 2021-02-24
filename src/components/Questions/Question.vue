<template>
  <div>
    <h3>{{ question.question }}</h3>
    <ul>
      <li v-for="answer of answerOptions" :key="answer">
        <button @click="selectAnswer(answer)">{{ answer }}</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { shuffle } from "../utils";

export default {
  name: "Question",
  props: {
    question: Object,
    selectAnswer: Function,
  },
  computed: {
    answerOptions: function () {
      const { incorrect_answers, correct_answer } = this.question;
      return shuffle([...incorrect_answers, correct_answer]);
    },
  },
  methods: {},
};
</script>

<style>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
button {
  margin: 5px;
}
</style>