<template>
  <button
    :disabled="disabled"
    :class="['ui-button', `_${variant}`, `_${size}`]"
  >
    <slot name="prepend"></slot>
    <span class="ui-button__content">
      <slot name="default">
        {{ label }}
      </slot>
    </span>
    <slot name="append"></slot>
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
    disabled: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style  scoped>
.ui-button {
  /* @include head-6; */
  background: var(--bg-btn-primary);
  border: none;
  color: var(--text-color-tertiary);
  text-align: center;
  cursor: pointer;
  border-radius: var(--border-radius-sm);
  position: relative;
  overflow: hidden;

  /* &:disabled {
    opacity: $disabled-opacity;
    pointer-events: none;
  } */
}
</style>
