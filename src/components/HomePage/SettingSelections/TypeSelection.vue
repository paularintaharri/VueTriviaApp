<template>
  <form @change="selectType">
    <select v-model="type">
      <option value="">Any question type</option>
      <option value="multiple">Multiple choice</option>
      <option value="boolean">True / False</option>
    </select>
  </form>
</template>

<script>
export default {
  name: "TypeSelection",
  data() {
    return {
      type: "",
    };
  },
  methods: {
    selectType() {
      this.$emit("type", this.type);
    },
  },
};
</script>