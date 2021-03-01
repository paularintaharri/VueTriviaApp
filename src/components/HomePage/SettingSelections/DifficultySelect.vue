<template>
  <form @change="selectDifficulty">
    <select v-model="difficulty">
      <option value="">Any difficulty</option>
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
  </form>
</template>

<script>
export default {
  name: "DifficultySelect",
  data() {
    return {
      difficulty: "",
    };
  },
  methods: {
    selectDifficulty() {
      this.$emit("difficulty", this.difficulty);
    },
  },
};
</script>

<style scoped>
select {
  padding: 1mm;
  border-radius: 10mm;
}
</style>
