<template>
  <div class="result-container">
    <h1>Game finished</h1>
    <h2 class="total-score">Total score: {{ totalScore }} / 100</h2>
    <h3>The right answers</h3>
    <table>
      <tr>
        <th>Questions</th>
        <th>Correct Answers</th>
        <th>Your Answers</th>
      </tr>
      <tr v-for="(result, index) in answers" :key="index" :class="correctAnswer(result)">
        <td>{{ result.question }}</td>
        <td>{{ result.correct_answer }}</td>
        <td>{{ result.user_answer }}</td>
      </tr>
    </table>
    <router-link to="/"><button class="start-over-btn"><b>Play again!</b></button></router-link>
  </div>
</template>

<script>
export default {
    name: "ResultPage",
    props: {
      answers: Array,
      totalScore: Number,
    },
    methods: {
        correctAnswer: function(result) {
          if (result.correct_answer === result.user_answer){
            return "correct";
          } else {
            return "incorrect"
          }
        },
    }
};
</script>

<style scoped>

th, td {
  padding: 15px;
  text-align: left;
  border-collapse: separate;
  border-radius: 6px;
  text-align: center;
}
.correct {
  background-color: #d6f5d6;
}
.incorrect {
  background-color: #ffcccc;
}
.start-over-btn{
  margin: 1em ;
  padding: .5em;
  font-size: medium;
}

</style>