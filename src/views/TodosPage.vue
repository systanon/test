<script lang="ts">
import { defineComponent } from "vue";
import UICheckBox  from "../components/ui/checkbox/UICheckBox.vue"
import { useTodosStore } from "../stores/todo.store";

type TodosPage = {
  username: string,
  title: string,
  favorites: boolean,
}

export default defineComponent({
  components: {
    UICheckBox
  },
  data: (): TodosPage => ({
    username: '',
    title: '',
    favorites: false,
  }),
  setup() {
    const todoStore = useTodosStore()

    return { todoStore }
  },
  computed: {
    todos () {
      return this.todoStore.todos.filter(todo => {
        if (this.favorites) return todo.favorite

        const username = this.title.length >= 3 ? (todo.user?.name.includes(this.username) ?? false) : true
        const title = this.title.length >= 3 ? todo.title.includes(this.title) : true
        return username && title
      })
    },
    currentUserId() {
      return Number(this.$route.params.userId);
    },
  },
  mounted() {
    // TODO: call pinia, add inputs tim and debounce
    this.todoStore.getTodos()
  },
  methods: {
    changeHandler (checked: boolean, id: number, userId: number) {
      console.log(checked, id, userId) 
    },
    favoriteHandler (favorite: boolean, id: number) {
      if (favorite) {
        this.todoStore.addFavorite(id)
        
      } else {
        this.todoStore.deleteFavorite(id)
        
      }
      console.log(favorite, id) 
    }
  }
})
</script>

<template>
  <div class="todos">
    <div :class="['todos-page', {_disabled: currentUserId !== userId}]" v-for="{title, completed, id, userId, user, favorite} of todos" :key="id">
      <p>{{ title }}</p>
      <p>{{ user?.username }}</p>
      <p> Completed </p>
      <UICheckBox :modelValue="completed" @update:modelValue="($event) => changeHandler($event, id, userId)"/>
        <div>
          <p> Favorite</p>
          <UICheckBox :modelValue="favorite" @update:modelValue="($event) => favoriteHandler($event, id)"/>
        </div>
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
.todos-page {
  border: 1px solid green;
}


</style>
