<template>
  <div class="question-page">
    <h1>Questions</h1>
    <template v-if="questions.length > 0">
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
    <template v-else>
      <p>loading...</p>
    </template>
  </div>
</template>

<script>
import { addOrReplaceAnswerInArray } from "../utils";
import Question from "./Question.vue";

export default {
  name: "QuestionPage",
  components: { Question },
  async created() {
    const questions = await this.getQuestionsFromAPI();
    this.questions = questions;
  },
  data() {
    return {
      index: 0,
      questions: [],
      answers: [],
      totalScore: 0,
    };
  },
  computed: {
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
    selectAnswer(answer) {
      const { question, correct_answer } = this.currentQuestion;
      const newAnswerObj = {
        question,
        correct_answer,
        user_answer: answer,
      };
      addOrReplaceAnswerInArray(this.answers, newAnswerObj);
      this.nextQuestion();
      console.log("length", this.answers.length, { answers: this.answers });
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
    getQuestionsFromAPI() {
      return fetch("https://opentdb.com/api.php?amount=10")
        .then((response) => response.json())
        .then(({ results }) => {
          return results.map((questionObject) => {
            const {
              category,
              correct_answer,
              difficulty,
              incorrect_answers,
              question,
              type,
            } = questionObject;
            return {
              category: this.parseString(category),
              correct_answer: this.parseString(correct_answer),
              difficulty: this.parseString(difficulty),
              incorrect_answers: incorrect_answers.map((answer) =>
                this.parseString(answer)
              ),
              question: this.parseString(question),
              type: this.parseString(type),
            };
          });
        })
        .catch((error) => console.error(error.message));
    },
    parseString(string) {
      return string.replaceAll(/(&quot;)|(&#039;)/g, "'");
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
