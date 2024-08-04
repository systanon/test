<script lang="ts">
import { defineComponent } from "vue";
import UICheckBox  from "../components/ui/checkbox/UICheckBox.vue"
import { todoService } from "../application";
import { Todo } from "../application/services/todo.service";

type TodosPage = {
  todos: Array<Todo>
}

export default defineComponent({
  components: {
    UICheckBox
  },

  data: (): TodosPage => ({
    todos: []
  }),
  mounted() {
    todoService.getAll().then(({data}) => this.todos = data)
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
