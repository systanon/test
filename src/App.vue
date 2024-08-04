<script lang="ts">
import { mapActions } from "pinia";
import { defineComponent } from "vue";
import { useUsersStore } from "./stores/UsersStore";

export default defineComponent({
  methods: {
    ...mapActions(useUsersStore, ["getUsers"]),
  },
  created() {
    this.getUsers();
  },
});
</script>

<template>
  <router-view />
</template>

<style src="./css/reset.css"></style>
