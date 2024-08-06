<script lang="ts">
import { mapActions } from "pinia";
import { defineComponent } from "vue";
import { useTodosStore } from "./stores/todo.store";
import { useUsersStore } from "./stores/user.store";

export default defineComponent({
   setup() {
    const usersStore = useUsersStore();
    const todosStore = useTodosStore();

    return { usersStore, todosStore };
  },
  created() {
    this.todosStore.restoreFavorite()
    this.usersStore.getUsers()
  },
});
</script>

<template>
  <router-view />
</template>

<style src="./css/reset.css"></style>
