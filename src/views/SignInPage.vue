<template>
  <SignInForm @submit="submit"/>
  
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SignInForm from "../components/form/SignInForm.vue";


export default defineComponent({
  name: "SignInPage",
  components: {
    SignInForm
  },
  // setup: () => ({ v$: useVuelidate() }),
  data: () => ({
    form: {
      loginOrEmail: "",
      password: "",
    },
  }),
  methods: {
    async submit() {
      // const resultValidate = await this.v$.$validate();
      // if (!resultValidate) return;
      // this.$emit("submit", this.form);
    },
  },
});
</script>