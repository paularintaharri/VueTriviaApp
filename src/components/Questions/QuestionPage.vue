<template>
  <div class="question-page">
    <h1>Questions</h1>
    <template v-if="thereAreQuestions">
      <p>{{ questionIndexing }}</p>
      <question :question="currentQuestion" :selectAnswer="selectAnswer" />
      <div id="button-container">
        <button v-show="showPreviousButton" @click="previousQuestion">
          Previous
        </button>
        <button v-show="showNextButton" @click="nextQuestion">Next</button>
      </div>
      <div id="finish-container">
        <button id="finish-trivia" v-on:click="finishTrivia">
          <b>Finish</b>
        </button>
      </div>
    </template>
    <template v-else-if="failedToLoad">
      <p>Error getting questions from server</p>
      <router-link to="/">
        <button class="home"><b>Home!</b></button>
      </router-link>
    </template>
    <template v-else>
      <p>loading...</p>
    </template>
  </div>
</template>

<script>
import { addOrReplaceAnswerInArray, parseApiQuestionObj } from "../utils";
import Question from "./Question.vue";

export default {
  name: "QuestionPage",
  components: { Question },
  async created() {
    this.failedToLoad = false;
    const questions = await this.getQuestionsFromAPI(10);
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
      totalScore: 0,
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
    showNextButton: function () {
      return this.index < this.questions.length - 1;
    },
    showPreviousButton: function () {
      return this.index > 0;
    },
    questionIndexing: function () {
      return +(this.index + 1) + "/" + this.questions.length;
    },
  },
  methods: {
    getQuestionsFromAPI(
      amount = 10,
      category = "",
      difficulty = "",
      type = ""
    ) {
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
    selectAnswer(answer) {
      const { question, correct_answer } = this.currentQuestion;
      const newAnswerObj = {
        question,
        correct_answer,
        user_answer: answer,
      };
      addOrReplaceAnswerInArray(this.answers, newAnswerObj);
      this.nextQuestion();
      if (correct_answer === answer) {
        this.totalScore += 10;
      }
    },
    previousQuestion() {
      this.index -= 1;
      if (this.index < 0) {
        this.index = 0;
      }
    },
    nextQuestion() {
      this.index += 1;
      if (this.index >= this.questions.length) {
        this.index = this.questions.length - 1;
      }
    },
    finishTrivia() {
      this.$router.push({
        name: "ResultPage",
        params: {
          answers: this.answers,
          totalScore: this.totalScore,
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
#button-container {
  margin: 0 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
#finish-container {
  margin: 5mm;
}
</style>
