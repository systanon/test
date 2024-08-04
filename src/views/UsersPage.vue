<script lang="ts">
import { defineComponent } from "vue";
import { users } from '../services'
import { ApiUser } from "../services/users.service";

type UserPage = {
  users: Array<ApiUser>
}

export default defineComponent({

  data: (): UserPage => ({
    users: []
  }),

  mounted() {
    users.getUsers().then(users => this.users = users)
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
