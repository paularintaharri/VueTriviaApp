<template>
  <form @change="selectAmount">
    <select v-model="amount">
      <option value="1">1 questions</option>
      <option value="5">5 questions</option>
      <option value="10" selected>10 question</option>
      <option value="20">20 question</option>
      <option value="30">30 question</option>
      <option value="40">40 question</option>
      <option value="50">50 question</option>
    </select>
  </form>
</template>

<script>
export default {
  name: "AmountSelection",
  data() {
    return {
      amount: 10,
    };
  },
  methods: {
    selectAmount() {
      this.$emit("amount", this.amount);
    },
  },
};
</script>