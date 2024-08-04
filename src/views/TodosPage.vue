<script lang="ts">
import { defineComponent } from "vue";
import { todos } from '../services'
import { ApiTodo } from "../services/todo.service";
import UICheckBox  from "../components/ui/checkbox/UICheckBox.vue"

type TodosPage = {
  todos: Array<ApiTodo>
}

export default defineComponent({
  components: {
    UICheckBox
  },

  data: (): TodosPage => ({
    todos: []
  }),
  mounted() {
    todos.geTodos().then(todos => this.todos = todos)
  },
  methods: {
    changeHandler (checked: boolean, id: number, userId: number) {
      console.log(checked, id, userId) 
    }
  }
})
</script>

<template>
  <div class="todos">
    <div class="todos-page" v-for="{title, completed, id, userId} of todos" :key="id">
      <p>{{ title }}</p>
      <p>{{ completed }}</p>
      <UICheckBox :modelValue="completed" @update:modelValue="($event) => changeHandler($event, id, userId)"/>
    </div>   
  </div>
</template>

<style scoped>
.todos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

</style>
