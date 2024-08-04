<template>
  <div class="sign-in-form">
    <h2 class="sign-in-form__title"> Description </h2>
    <div class="sign-in-form__inputs">
      <p> Description </p>
      <UIInput
        type="text"
        name="username"
        v-model:value="form.username"
        label="User name"
        :validator="v$.form.username"
        class="sign-in-form__input"
      />
      <UIInput
        type="text"
        name="phone"
        v-model:value="form.phone"
        label="phone"
        :validator="v$.form.phone"
        class="sign-in-form__input"
      />
      <UIButton class="sign-in-form__action-btn" label="submit" @click="submit" />
    </div>
    <!-- <div class="sign-in-form__action"> -->
    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UIInput from "../ui/input/UIInput.vue";
import UIButton from "../ui/button/UIButton.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, numeric } from "@vuelidate/validators";

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
      username: "Bret",
      phone: "1-770-736-8031 x56442",
    },
  }),
  validations() {
    return {
      form: {
        username: { required },
        // phone: { required, numeric },
        phone: { required },
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
.sign-in-form {
  width: 447px;
  height: 299px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  background: #C3C3C3;
}
.sign-in-form__title {
  width: 100%;
  padding: 15px 0;
  background-color: #A5A5A5;
}
.sign-in-form__inputs {
  text-align: left;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 1rem;
}
.sign-form__input {
  height: 41px;
  background-color: white;
}
.sign-in-form__action-btn {
  margin-top: 15px;
  width: 100%;
  background-color: #519945;
  height: 35px;
}
</style>
