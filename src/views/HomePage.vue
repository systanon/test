<script lang="ts">
import { defineComponent } from "vue";

import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import UIInput from "./ui/input/UIInput.vue";


export default defineComponent({
   components: {
    UIInput,
  },
  setup: () => ({ v$: useVuelidate() }),
  data: () => ({
    form: {
      loginOrEmail: "",
      password: "",
    },
  }),

  validations() {
    return {
      form: {
        loginOrEmail: { required },
        password: { required },
      },
    };
  },
  mounted() {
  }
})
</script>

<template>
      <UIInput
        type="text"
        name="login"
        v-model:value="form.loginOrEmail"
        label="sign_in_form.login_or_email"
        :validator="v$.form.loginOrEmail"
      />
      <p>hello world</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
