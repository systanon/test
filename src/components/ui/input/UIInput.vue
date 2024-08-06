<template>
    <div class="ui-input">

      <div class="ui-input__control-wrap">
        <input
          ref="input"
          :class="['ui-input__control', { _error: localError }]"
          v-bind="computedAttrs"
          v-on="computedListeners"
          :placeholder="label"
        />
      </div>
    </div>
</template>

<script>
   const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    })
   }

export default {
  name: "UIInput",

  inheritAttrs: false,
  props: {
    error: { type: String, default: "" },
    id: { type: String, default: () => uuidv4() },
    label: { type: String, default: "" },
    type: { type: String, default: "text" },
    validator: { type: Object, default: null },
    value: { type: [String, Number], default: "" },
  },
  data() {
    return {
      localValue: this.value,
      paddingRight: 0,
    };
  },
  computed: {
    computedAttrs() {
      const { id, disabled, readonly, type, localValue } = this;
      return {
        disabled,
        id,
        readonly,
        type,
        value: localValue,
        ...this.$attrs,
      };
    },
    computedListeners() {
      const { onChange, onInput } = this;
      return {
        ...this.$attrs,
        input: onInput,
        change: onChange,
      };
    },
    localError() {
      return this.validator?.$error;
    },

  },
  watch: {
    value(val) {
      this.localValue = val;
    },
  },

  methods: {
    uuidv4,
    onChange(e) {
      const value = e.target.value;
      this.localValue = value;
      this.$emit("change", value);
    },
    onInput(e) {
      const value = e.target.value;
      this.localValue = value;
      this.$emit("update:value", value);
    },
  },
};
</script>

<style scoped>
.ui-input__control {
  background-color: white;
  height: 41px;
  width: 100%;
  color: #353535;
}
._error {
  border-color: red;
}
</style>

