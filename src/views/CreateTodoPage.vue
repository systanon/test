<script lang="ts">
import { defineComponent } from "vue";
import { useUsersStore } from "../stores/user.store";
import CreateTodoForm from "../components/form/CreateTodoForm.vue";
import { CreateTodoDto } from "../application/services/todo.service";
import { useTodosStore } from "../stores/todo.store";

export default defineComponent({
  components: {
    CreateTodoForm
  },
  setup() {
    const usersStore = useUsersStore();
    const todosStore = useTodosStore();

    return { usersStore, todosStore };
  },
  computed: {
    usersId() {
      return [...this.usersStore.index.keys()]
    },
  },
  methods: {
    submit(dto: CreateTodoDto) {
      this.todosStore.createTodo(dto)
    }
  },
});
</script>

<template>
  <div class="create-todo">
    <CreateTodoForm :options="usersId" @submit="submit"/>
  </div>
</template>

<style scoped>
.create-todo {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
