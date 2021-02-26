<template>
  <div>
    Settings
    <div class="settings-container">
      <amount-selection @amount="setAmount" />
      <difficulty-select @difficulty="setDifficulty" />
      <type-selection @type="setType" />
    </div>
  </div>
</template>

<script>
import DifficultySelect from "./SettingSelections/DifficultySelect";
import TypeSelection from "./SettingSelections/TypeSelection.vue";
import AmountSelection from "./SettingSelections/AmountSelection";

export default {
  components: {
    DifficultySelect,
    TypeSelection,
    AmountSelection,
  },
  name: "Settings",
  data() {
    return {
      settings: {},
    };
  },
  methods: {
    saveSettings() {
      this.$emit("settings", this.settings);
    },
    setDifficulty(difficulty) {
      this.settings = {
        ...this.settings,
        difficulty,
      };
      this.saveSettings();
    },
    setType(type) {
      this.settings = {
        ...this.settings,
        type,
      };
      this.saveSettings();
    },
    setAmount(amount) {
      this.settings = {
        ...this.settings,
        amount,
      };
      this.saveSettings();
    },
  },
};
</script>

<style scoped>
.settings-container {
  margin-left: 25%;
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  justify-self: center;
}
button {
  background-color: #35495e;
  color: #ffffff;
  margin: 1em;
  padding: 0.5em;
  font-size: medium;
  font-weight: bold;
}
</style>