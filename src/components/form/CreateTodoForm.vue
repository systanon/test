<template>
  <div class="create-todo__form">
    <h2 class="create-todo__form-title">Description</h2>
    <div class="create-todo__form-body">
    <p class="create-todo__form-subtitle">Description</p>
    <UISelect
      v-model="form.userId"
      :options="options"
      class="create-todo__form-options"
    />
    <UIInput
      type="text"
      name="title"
      v-model:value="form.title"
      label="title"
      :validator="v$.form.title"
      class="create-todo__form-title"
    />
    <UIButton class="create-todo__form-submit" label="submit" @click="submit" />

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UIInput from "../ui/input/UIInput.vue";
import UISelect from "../ui//select/UISelect.vue";
import UIButton from "../ui/button/UIButton.vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default defineComponent({
  name: "CreateTodoForm",
  emits: ["submit"],
  components: {
    UIInput,
    UIButton,
    UISelect,
  },
  props: {
    options: {
      type: Array<string>,
      default: () => [],
    },
  },
  setup: () => ({ v$: useVuelidate() }),
  data: () => ({
    form: {
      userId: 0,
      title: ""
    },
  }),
  validations() {
    return {
      form: {
        title: { required },
      },
    };
  },
  methods: {
    async submit() {
      const resultValidate = await this.v$.$validate();
      if (!resultValidate) return;
      this.$emit("submit", this.form);
    },
  },
});
</script>

<style scoped >
.create-todo__form {
  width: 447px;
  height: 299px;
  grid-auto-rows: max-content auto;
  display: grid;
  background: #c3c3c3;
}
.create-todo__form-title {
  padding: 15px 0;
  background-color: #A5A5A5;
}
.create-todo__form-body {
  display: grid;
  padding: 0 25px 50px 25px;
}
.create-todo__form-subtitle {
  display: flex;
  align-items: center;
}
::v-deep.ui-select {
  height: 41px;
}
.sign-form__input {
  background-color: white;
}
.create-todo__form-submit {
  background-color: #519945;
}
</style>
