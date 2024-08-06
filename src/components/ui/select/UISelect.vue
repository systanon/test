<template>
  <div class="ui-select">
    <button class="ui-select__toggler" @click="toggle">
      <span class="ui-select__toggler-text"> {{ modelValue }}</span>
    </button>
    <div v-if="optionsShown" class="ui-select__options">
      <ul class="ui-select__list">
        <li
          v-for="(option, index) in options"
          :key="index"
          class="ui-select__list-item"
          @click="updateValue(option)"
        >
          <span class="ui-select__list-item-text">
            {{ option }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UISelectOption = Record<string, any>;
export type ModelValueObject = UISelectOption;
export type ModelValuePrimitive = number | string;
export type ModelValue = ModelValuePrimitive | ModelValueObject;
export default defineComponent({
  name: "UISelect",
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: [String, Number, Object],
      default: null,
    },
    options: {
      type: Array as PropType<any>,
      default: () => [],
    },
  },
  data() {
    return {
      optionsShown: false,
    };
  },
  methods: {
    async setShowOptions(show: boolean) {
      this.optionsShown = show;
    },

    toggle() {
      this.setShowOptions(!this.optionsShown);
    },
    hide() {
      this.setShowOptions(false);
    },
    updateValue(value: ModelValue) {
      this.$emit("update:modelValue", value);
      this.hide();
    },
  },
});
</script>

<style lang="scss" scoped>
.ui-select {
  display: inline-flex;
  position: relative;
}
.ui-select__label {
  align-items: center;
  display: inline-flex;
}
.ui-select__toggler {
  width: 100%;
  z-index: 1;
  padding: 5px 10px;
  border: 1px solid green;
  background-color: transparent;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.ui-select__options {
  position: absolute;
  background-color: green;
  border-radius: 5px;
  display: grid;
  grid-template-rows: 1fr auto;
  overflow: hidden;
  z-index: 100;
  top: 150%;
  width: 100%;
}
.ui-select__list-item {
  cursor: pointer;
  position: relative;
  user-select: none;
  padding-bottom: 3px;
  padding-top: 3px;
}
.ui-select__list-item-text {
  display: block;
  box-sizing: border-box;
  padding-left: 5px;
  padding-right: 5px;
}
</style>