<template>
  <SignInForm @submit="submit" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SignInForm from "../components/form/SignInForm.vue";
import { authService } from "../application";
import { SignInDto } from "../application/services/auth.service";

import { mapState } from "pinia";
import { useUsersStore } from "../stores/UsersStore";

export default defineComponent({
  name: "SignInPage",
  components: {
    SignInForm,
  },
  computed: {
    ...mapState(useUsersStore, ["usersByKey"]),
  },
  methods: {
    async submit(dto: SignInDto) {
      console.log(await authService.signIn(dto))
      const { username, phone }: { username: string; phone: string } = dto;
      const key = `${username}:${phone}`;
      console.log(dto);
      console.log(this.usersByKey[key]);
      // const resultValidate = await this.v$.$validate();
      // if (!resultValidate) return;
      // this.$emit("submit", this.form);
    },
  },
});
</script>