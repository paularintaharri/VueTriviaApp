<template>
  <div>
    <h3>{{ question.question }}</h3>
    <template v-if="questionTypeBoolean">
      <boolean-answer-options :selectAnswer="selectAnswer" />
    </template>
    <template v-else>
      <multiple-answer-options
        :answerOptions="answerOptions"
        :selectAnswer="selectAnswer"
      />
    </template>
  </div>
</template>

<script>
import { shuffle } from "../utils";
import BooleanAnswerOptions from "./BooleanAnswerOptions.vue";
import MultipleAnswerOptions from "./MultipleAnswerOptions.vue";

export default {
  components: { BooleanAnswerOptions, MultipleAnswerOptions },
  name: "Question",
  props: {
    question: Object,
    selectAnswer: Function,
  },
  computed: {
    questionTypeBoolean: function () {
      const { type } = this.question;
      return type === "boolean";
    },
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