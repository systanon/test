<script lang="ts">
import { defineComponent } from "vue";
import { TodoAggregated, useTodosStore } from "../stores/todo.store";
import UISelect from "../components/select/UISelect.vue";
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
      console.log(checked, id, userId);
    },
    favoriteHandler(favorite: boolean, id: number) {
      if (favorite) {
        this.todoStore.addFavorite(id);
      } else {
        this.todoStore.deleteFavorite(id);
      }
    },
  },
});
</script>

<template>
  <div class="todos-header">
    <UISelect v-model="filter.option" :options="OPTIONS" />
    <UIInput
      type="text"
      name="username"
      v-model:value="filter.username"
      label="User name"
      class="sign-in-form__input"
    />
    <UIInput
      type="text"
      name="username"
      v-model:value="filter.title"
      label="Title"
      class="sign-in-form__input"
    />
  </div>
  <div class="todos">
    <div
      class="todos-page"
      v-for="{ title, completed, id, userId, user, favorite } of todos"
      :key="id"
    >
      <p>{{ title }}</p>
      <div class="todos-page__checked">
        <p>Completed</p>
        <UICheckBox
          :modelValue="completed"
          @update:modelValue="($event) => changeHandler($event, id, userId)"
        />
      </div>
      <div class="todos-page__checked">
        <p>Favorite</p>
        <UICheckBox
          :modelValue="favorite"
          @update:modelValue="($event) => favoriteHandler($event, id)"
        />
      </div>
      <p>{{ user?.username }}</p>
    </div>
  </div>
</template>

<style scoped>
.todos-header {
  padding-bottom: 25px;
  display: grid;
  grid-template-columns: 0.5fr 0.5fr 0.5fr;
  gap: 1rem;
}
.todos {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.todos-page {
  display: grid;
  gap: 10px;
  padding: 10px;
  border: 1px solid green;
}
.todos-page__checked {
  display: flex;
  justify-content: end;
  gap: 20px;
}
</style>
