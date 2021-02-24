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
    selectAnswer: Function,
  },
};
</script>
