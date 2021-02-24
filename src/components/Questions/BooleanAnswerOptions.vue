<template>
  <div>
    <button @click="selectAnswer('False')">False</button>
    <button @click="selectAnswer('True')">True</button>
  </div>
</template>

<script>
export default {
  name: 'BooleanAnswerOptions',
  props: {
    selectAnswer: Function,
  },
};
</script>
