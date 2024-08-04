<script lang="ts">
import { defineComponent } from "vue";
import { userService } from "../application";
import { User } from "../application/services/user.service";

type UserPage = {
  users: Array<User>
}

export default defineComponent({

  data: (): UserPage => ({
    users: []
  }),

  mounted() {
    userService.getAll().then(({data}) => this.users = data)
  }
})
</script>

<template>
  <div v-for="{username, phone, id} of users" :key="id">
    <p>{{ username }}</p>
    <p>{{ phone }}</p>
  </div>   
</template>

<style scoped>

</style>
