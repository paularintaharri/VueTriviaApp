<template>
  <div>
    <h3>{{ question.question }}</h3>
    <template v-if="questionTypeBoolean">
      <boolean-answer-options @selectAnswer="selectAnswer" />
    </template>
    <template v-else>
      <multiple-answer-options
        :answerOptions="answerOptions"
        @selectAnswer="selectAnswer"
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
  methods: {
    selectAnswer(answer) {
      const { question, correct_answer } = this.question;
      const newAnswerObj = {
        question,
        correct_answer,
        user_answer: answer,
      };
      this.$emit("selectAnswer", newAnswerObj);
    },
  },
};
</script>
