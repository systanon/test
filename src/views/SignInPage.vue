<template>
  <SignInForm @submit="submit"/>
  
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SignInForm from "../components/form/SignInForm.vue";
import { authService } from "../application";
import { SignInDto } from "../application/services/auth.service";


export default defineComponent({
  name: "SignInPage",
  components: {
    SignInForm
  },
  methods: {
    async submit(dto: SignInDto) {
      console.log(await authService.signIn(dto))
      // const resultValidate = await this.v$.$validate();
      // if (!resultValidate) return;
      // this.$emit("submit", this.form);
    },
  },
});
</script>