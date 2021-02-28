<template>
  <div class="question-page">
    <h1>Questions</h1>
    <template v-if="failedToLoad">
      <p>Error getting questions from server</p>
      <router-link to="/">
        <button class="home"><b>Home!</b></button>
      </router-link>
    </template>
    <template v-else>
      <template v-if="thereAreQuestions">
        <p>{{ questionIndexing }}</p>
        <question :question="currentQuestion" @selectAnswer="selectAnswer" />
        <navigation-buttons
          :questionIndex="index"
          :questionsLength="totalQuestions"
          @navigateQuestions="navigateQuestions"
        />
      </template>
      <template v-else>
        <p>loading...</p>
      </template>
      <div id="finish-container">
        <button id="finish-trivia" v-on:click="finishTrivia">
          <b>Finish</b>
        </button>
      </div>
    </template>
  </div>
</template>

<script>
import { addOrReplaceAnswerInArray, parseApiQuestionObj } from "../utils";
import NavigationButtons from "./NavigationButtons.vue";
import Question from "./Question.vue";

export default {
  name: "QuestionPage",
  props: {
    APIProps: Object,
  },
  components: { Question, NavigationButtons },
  async created() {
    this.failedToLoad = false;
    const questions = await this.getQuestionsFromAPI(this.APIProps);
    if (questions) {
      this.questions = questions;
      this.answers = questions.map(({ question, correct_answer }) => ({
        question,
        correct_answer,
      }));
    }
  },
  data() {
    return {
      index: 0,
      questions: [],
      answers: [],
      failedToLoad: false,
    };
  },
  computed: {
    thereAreQuestions: function () {
      return this.questions && this.questions.length > 0;
    },
    currentQuestion: function () {
      return this.questions[this.index];
    },
    totalQuestions: function () {
      return this.questions.length;
    },
    questionIndexing: function () {
      return +(this.index + 1) + "/" + this.totalQuestions;
    },
  },
  methods: {
    getQuestionsFromAPI(props = {}) {
      const { amount = 10, category = "", difficulty = "", type = "" } = props;
      return fetch(
        `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
      )
        .then((response) => response.json())
        .then(({ results }) =>
          results.map((questionObject) => parseApiQuestionObj(questionObject))
        )
        .catch((error) => {
          this.failedToLoad = true;
          if (error instanceof Error) {
            console.error(error.message);
          }
        });
    },
    selectAnswer(answerObj) {
      addOrReplaceAnswerInArray(this.answers, answerObj);
      this.navigateQuestions(1);
    },
    navigateQuestions(value) {
      this.index += value;
      if (this.index < 0) {
        this.index = 0;
      }
      if (this.index >= this.totalQuestions) {
        this.index = this.totalQuestions - 1;
        this.finishTrivia();
      }
    },
    finishTrivia() {
      this.$router.push({
        name: "ResultPage",
        params: {
          answers: this.answers,
        },
      });
    },
  },
};
</script>

<style scoped>
#question-page {
  padding: 1cm;
  margin: 5mm;
}
h3 {
  margin: 40px 0 0;
}
button {
  margin: 0px 10px;
}
#finish-container {
  margin: 5mm;
}
</style>
