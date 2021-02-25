<template>
  <div class="result-container">
    <h1>Game finished</h1>
    <h2 class="total-score">Your score: XX / 100.</h2>
    <h4>The right answers</h4>
    <table>
      <tr>
        <th>Questions</th>
        <th>Correct Answers</th>
        <th>Your Answers</th>
      </tr>
      <tr v-for="(result, index) in answers" :key="index">
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
      
    },
    data() {
      return {
      };
    },
    
};

</script>

<style>

</style>