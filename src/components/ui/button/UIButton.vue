<template>
  <button class="ui-button">
    {{ label }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "UIButton",
  props: {
    label: {
      type: String,
      default: "",
    },
  },
});
</script>

<style  scoped>
.ui-button {
  /* @include head-6; */
  /* background: var(--bg-btn-primary); */
  border: none;
  /* color: var(--text-color-tertiary); */
  text-align: center;
  cursor: pointer;
  /* border-radius: var(--border-radius-sm); */
  position: relative;
  overflow: hidden;
}
</style>
