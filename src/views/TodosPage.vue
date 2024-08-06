<script lang="ts">
import { defineComponent } from "vue";
import { TodoAggregated, useTodosStore } from "../stores/todo.store";
import UISelect from "../components/ui/select/UISelect.vue";
import { Option } from "../application/types";
import UIButton from "../components/ui/button/UIButton.vue";
import UICheckBox from "../components/ui/checkbox/UICheckBox.vue";
import UIInput from "../components/ui/input/UIInput.vue";

const OPTIONS: Option[] = ["all", "completed", "uncompleted", "favorites"];

type Filter = {
  username: string;
  title: string;
  option: Option;
};
const byFilter =
  (filter: Filter) =>
  (todo: TodoAggregated): boolean => {
    const ok = {
      all: (_: TodoAggregated): boolean => true,
      uncompleted: (todo: TodoAggregated): boolean => !todo.completed,
      completed: (todo: TodoAggregated): boolean => todo.completed,
      favorites: (todo: TodoAggregated): boolean => todo.favorite,
    }[filter.option](todo);

    const username =
      filter.username.length >= 3
        ? todo.user?.username.includes(filter.username) ?? false
        : true;

    const title =
      filter.title.length >= 3 ? todo.title.includes(filter.title) : true;

    return ok && username && title;
  };

type TodosPage = {
  filter: Filter;
  favorites: boolean;
  OPTIONS: Option[];
};

export default defineComponent({
  components: {
    UICheckBox,
    UISelect,
    UIButton,
    UIInput,
  },
  data: (): TodosPage => ({
    filter: {
      username: "",
      title: "",
      option: "all",
    },
    favorites: false,
    OPTIONS,
  }),
  setup() {
    const todoStore = useTodosStore();

    return { todoStore };
  },
  computed: {
    todos() {
      return this.todoStore.todos.filter(byFilter(this.filter));
    },
  },
  mounted() {
    // TODO: call pinia, add inputs tim and debounce
    this.todoStore.getTodos();
  },
  methods: {
    changeHandler(checked: boolean, id: number, userId: number) {
      this.todoStore.updateTodo(id, { completed: checked });
    },
    favoriteHandler(favorite: boolean, id: number) {
      if (favorite) {
        this.todoStore.addFavorite(id);
      } else {
        this.todoStore.deleteFavorite(id);
      }
    },
    goTo() {
      this.$router.push({ name: "CreateTodoPage"});
    }
  },
});
</script>

<template>
  <div class="todos-page">
    <div class="_content">
      <div class="todos-page__header todos-filter">
        <UISelect
          v-model="filter.option"
          :options="OPTIONS"
          class="todos-filter__options"
        />
        <UIInput
          type="text"
          name="username"
          v-model:value="filter.username"
          label="User name"
          class="todos-filter__name"
        />
        <UIInput
          type="text"
          name="username"
          v-model:value="filter.title"
          label="Title"
          class="todos-filter__title"
        />
         <UIButton label="Create todo" @click="goTo" />
      </div>
      <div class="todos-page__list todo-list">
        <div
          class="todo-list__item todo"
          v-for="{ title, completed, id, userId, user, favorite } of todos"
          :key="id"
        >
          <p class="todo__title">{{ title }}</p>
          <div class="todo__completed">
            <p>Completed</p>
            <UICheckBox
              :modelValue="completed"
              @update:modelValue="($event) => changeHandler($event, id, userId)"
            />
          </div>
          <div class="todo__favorite">
            <p>Favorite</p>
            <UICheckBox
              :modelValue="favorite"
              @update:modelValue="($event) => favoriteHandler($event, id)"
            />
          </div>
          <p class="todo__username">{{ user?.username }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.todos-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 10px;
  padding: 4rem 2rem;
}
.todos-page__header {
  width: 100%;
  flex: 0 0;
}
.todos-page__list {
  width: 100%;
  flex: 1 1;
}

.todos-filter {
  padding-bottom: 25px;
  display: grid;
  grid-template-columns: 0.5fr 0.5fr 0.5fr 0.5fr;
  gap: 1rem;
}

.todo-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}
.todo-list__item {
    border: 1px solid green;
    padding: 10px;
  
}
.todo {
  display: grid;
  gap: 1rem;
}

.todo__completed, .todo__favorite {
  display: flex;
  justify-content: end;
  gap: 20px;
}
</style>
