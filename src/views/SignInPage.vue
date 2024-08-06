<template>
<div class="sign-in">
  <SignInForm @submit="submit" />
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SignInForm from "../components/form/SignInForm.vue";
import { authService } from "../application";
import { SignInDto } from "../application/services/auth.service";


export default defineComponent({
  name: "SignInPage",
  components: {
    SignInForm,
  },
  methods: {
    async submit(dto: SignInDto) {
      const userId = await authService.signIn(dto)
      if (userId !== undefined) {
        this.$router.push({ name: "TodosPage", params: { userId } });
      } else {
        console.error('no such user')
      }
    },
  },
});
</script>
<style scoped>
.sign-in {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>