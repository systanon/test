<script lang="ts">
import { defineComponent } from "vue";
import { useTodosStore } from "../stores/todo.store";
import UISelect from "../components/select/UISelect.vue";
import { Option } from "../application/types";
import UIButton from "../components/ui/button/UIButton.vue";
import UICheckBox from "../components/ui/checkbox/UICheckBox.vue";
import UIInput from "../components/ui/input/UIInput.vue";

const OPTIONS: Option[] = ["all", "completed", "uncompleted"];

type TodosPage = {
  username: string;
  title: string;
  favorites: boolean;
  option: Option;
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
    username: "",
    title: "",
    favorites: false,
    option: "all",
    OPTIONS,
  }),
  setup() {
    const todoStore = useTodosStore();

    return { todoStore };
  },
  computed: {
    todos() {
      return this.todoStore.todos.filter((todo) => {
        if (this.favorites) return todo.favorite;

        const username =
          this.username.length >= 3
            ? todo.user?.username.includes(this.username) ?? false
            : true;
        const title =
          this.title.length >= 3 ? todo.title.includes(this.title) : true;
        return username && title;
      });
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
    <UISelect v-model="option" :options="OPTIONS" />
    <div>
      <p>Select only favorites</p>
      <UICheckBox v-model="favorites" />
    </div>
    <UIInput
      type="text"
      name="username"
      v-model:value="username"
      label="User name"
      class="sign-in-form__input"
    />
    <UIInput
      type="text"
      name="username"
      v-model:value="title"
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
  grid-template-columns: 1fr 0.5fr 1fr 1fr;
}
.todos {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.todos-page {
  padding: 5px 10px;
  border: 1px solid green;
}
.todos-page__checked {
  display: flex;
  justify-content: center;
  gap: 5px;
}
</style>
