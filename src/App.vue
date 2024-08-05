<script lang="ts">
import { mapActions } from "pinia";
import { defineComponent } from "vue";
import { useTodosStore } from "./stores/todo.store";

export default defineComponent({
  methods: {
    ...mapActions(useTodosStore, ["restoreFavorite"]),
  },
  created() {
    this.restoreFavorite()
  },
});
</script>

<template>
  <router-view />
</template>

<style src="./css/reset.css"></style>
