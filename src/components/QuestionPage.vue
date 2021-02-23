<template>
  <div class="question-page">
    <h1>Questions</h1>
    <p>{{ index + 1 }}/{{ questions.length }}</p>
    <div>
      <h3>{{ getCurrentQuestion().question }}</h3>
      <ul>
        <li v-for="answer of getAnswerOptions()" :key="answer">
          <button @click="selectAnswer(answer)">{{ answer }}</button>
        </li>
      </ul>
    </div>
    <div>
      <button
        id="previous-question"
        v-show="indexBiggerThan(0)"
        @click="previousQuestion"
      >
        Previous
      </button>
      <button
        id="next-question"
        v-show="indexSmallerThan(questions.length - 1)"
        @click="nextQuestion"
      >
        Next
      </button>
    </div>
    <div id="finish-container">
      <router-link to="/results">
        <button><b>Finish</b></button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionPage",
  data() {
    return {
      index: 0,
      questions: [
        {
          category: "Entertainment: Video Games",
          type: "multiple",
          difficulty: "easy",
          question:
            "In the game Dark Souls, what is the name of the region you&#039;re in for the majority of the game?",
          correct_answer: "Lordran",
          incorrect_answers: ["Drangleic", "Oolacile", "Catarina"],
        },
        {
          category: "Entertainment: Japanese Anime & Manga",
          type: "boolean",
          difficulty: "easy",
          question:
            "In the &quot;Melancholy of Haruhi Suzumiya&quot; series, the narrator goes by the nickname Kyon.",
          correct_answer: "True",
          incorrect_answers: ["False"],
        },
        {
          category: "Entertainment: Video Games",
          type: "multiple",
          difficulty: "hard",
          question:
            "Which of these weapon classes DO NOT appear in the first Monster Hunter game?",
          correct_answer: "Bow ",
          incorrect_answers: ["Hammer", "Heavy Bowgun", "Light Bowgun"],
        },
        {
          category: "Entertainment: Film",
          type: "multiple",
          difficulty: "medium",
          question:
            "In The Lord of the Rings: The Fellowship of the Ring, which one of the following characters from the book was left out of the film?",
          correct_answer: "Tom Bombadil",
          incorrect_answers: ["Strider", "Barliman Butterbur", "Celeborn"],
        },
        {
          category: "Entertainment: Video Games",
          type: "multiple",
          difficulty: "easy",
          question:
            "Which water-type Pok&eacute;mon starter was introduced in the 4th generation of the series?",
          correct_answer: "Piplup",
          incorrect_answers: ["Totodile", "Oshawott", "Mudkip"],
        },
        {
          category: "Geography",
          type: "multiple",
          difficulty: "medium",
          question: "What is the capital of Slovakia?",
          correct_answer: "Bratislava",
          incorrect_answers: ["Sofia", "Ljubljana", "Sarajevo"],
        },
        {
          category: "Vehicles",
          type: "multiple",
          difficulty: "easy",
          question:
            "What are the cylinder-like parts that pump up and down within the engine?",
          correct_answer: "Pistons",
          incorrect_answers: ["Leaf Springs", "Radiators", "ABS"],
        },
        {
          category: "Entertainment: Television",
          type: "multiple",
          difficulty: "hard",
          question:
            "What was the callsign of Commander William Adama in Battlestar Galactica (2004)?",
          correct_answer: "Husker",
          incorrect_answers: ["Starbuck", "Apollo", "Crashdown"],
        },
        {
          category: "History",
          type: "multiple",
          difficulty: "hard",
          question:
            "Which U.S. president was said to have been too honest to lie to his father about chopping down a cherry tree?",
          correct_answer: "George Washington",
          incorrect_answers: [
            "Abraham Lincoln",
            "Thomas Jefferson",
            "James Monroe",
          ],
        },
        {
          category: "History",
          type: "multiple",
          difficulty: "easy",
          question:
            "Who rode on horseback to warn the Minutemen that the British were coming during the U.S. Revolutionary War?",
          correct_answer: "Paul Revere",
          incorrect_answers: [
            "Thomas Paine",
            "Henry Longfellow",
            "Nathan Hale",
          ],
        },
      ],
      answers: [],
    };
  },
  methods: {
    getCurrentQuestion() {
      return this.questions[this.index];
    },
    getAnswerOptions() {
      const question = this.getCurrentQuestion();
      return this.shuffle([
        ...question.incorrect_answers,
        question.correct_answer,
      ]);
    },
    shuffle(array) {
      return array;
    },
    selectAnswer(answer) {
      const { question, correct_answer } = this.getCurrentQuestion();
      const newAnswerObj = {
        question,
        correct_answer,
        user_answer: answer,
      };
      const alreadyAnswered = this.answers.find(
        (answer) => answer.question === question
      );
      if (alreadyAnswered) {
        this.answers = this.answers.map((answer) =>
          answer.question === question ? newAnswerObj : answer
        );
      } else {
        this.answers.push(newAnswerObj);
      }
      console.log(this.answers.length, this.answers);
    },
    indexBiggerThan(number) {
      return this.index > number;
    },
    indexSmallerThan(number) {
      return this.index < number;
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
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
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
#finish-container {
  padding: 5mm;
}
</style>
