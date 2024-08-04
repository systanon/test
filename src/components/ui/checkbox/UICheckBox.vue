<template>
  <!-- <label class="ui-checkbox">
    <div class="ui-checkbox__wrapper"> -->
      <input
        type="checkbox"
        :checked="modelValue"
        class="ui-checkbox"
        @change="changeHandler"
      />
    <!-- </div>
  </label> -->
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "UICheckbox",
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    changeHandler (event: InputEvent) {
      const checkbox = event.target as HTMLInputElement
      checkbox && this.$emit('update:modelValue', checkbox.checked)
    }
  }
});
</script>

<style scoped >
.ui-checkbox {
  width: 15px;
  height: 15px;
}

</style>