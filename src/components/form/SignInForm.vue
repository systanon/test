<template>
  <div class="sign-in__form">
    <h2 class="sign-in__form-title">Description</h2>
    <div class="sign-in__form-body">
      <p class="sign-in__form-subtitle">Description</p>
      <UIInput
        type="text"
        name="username"
        v-model:value="form.username"
        label="User name"
        :validator="v$.form.username"
        class="sign-in__form-username"
      />
      <UIInput
        type="text"
        name="phone"
        v-model:value="form.phone"
        label="phone"
        :validator="v$.form.phone"
        class="sign-in__form-phone"
      />
      <UIButton class="sign-in__form-submit" label="submit" @click="submit" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UIInput from "../ui/input/UIInput.vue";
import UIButton from "../ui/button/UIButton.vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const PHONE_MATCH = (val) => val.match(/^(\+?\d{1,3})?[-.\s]?(\(\d{1,4}\)|\d{1,4})?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/);
const NAME_MATCH = (val) => val.match(/^[a-zA-Z]+$/)

export default defineComponent({
  name: "SignInForm",
  emits: ["submit"],
  components: {
    UIInput,
    UIButton,
  },
  setup: () => ({ v$: useVuelidate() }),
  data: () => ({
    form: {
      username: "Samantha",
      phone: "1-463-123-4447",
    },
  }),
  validations() {
    return {
      form: {
        username: { required, NAME_MATCH },
        phone: {
          required, PHONE_MATCH
         },
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
.sign-in__form {
  width: 447px;
  height: 299px;
  grid-auto-rows: max-content auto;
  display: grid;
  background: #c3c3c3;
}
.sign-in__form-title {
  padding: 15px 0;
  background-color: #a5a5a5;
}
.sign-in__form-body {
  display: grid;
  padding: 0 25px 50px 25px;
}
.sign-in__form-subtitle {
  display: flex;
  align-items: center;
}
.sign-in__form-submit {
  background-color: #519945;
}
</style>
