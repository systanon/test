import { defineStore } from "pinia";
import { ID } from "../application/types";
import { Todo } from "../application/services/todo.service";
import { todoService } from "../application";
import { useUsersStore } from "./user.store";
import { User } from "../application/services/user.service";

type TodoStore = {
  list: Array<Todo>;
  index: Map<ID, Todo>;
  total: number;
  pages: number;
  favorites: Set<ID>;
};

export type TodoAggregated = Todo & { user: User | null; favorite: boolean };

const STORAGE_KEY = "todo-favorites";

export const useTodosStore = defineStore("TodosStore", {
  state: (): TodoStore => {
    return {
      list: [],
      index: new Map(),
      total: 0,
      pages: 1,
      favorites: new Set(),
    };
  },
  getters: {
    todos(store): Array<TodoAggregated> {
      const userStore = useUsersStore();
      return store.list.map((todo) => ({
        ...todo,
        user: userStore.index.get(todo.userId) ?? null,
        favorite: this.favorites.has(todo.id),
      }));
    },
     
  },
  actions: {
    getTodos() {
      todoService
        .getAll()
        .then(({ data, total, pages }) => {
          this.list = data;
          data.forEach((user) => this.index.set(user.id, user));
          this.total = total;
          this.pages = pages;
        })
        .finally(() => {
          const userStore = useUsersStore();
          userStore.list.length == 0 && userStore.getUsers();
        });
    },
    addFavorite(id: ID) {
      this.favorites.add(id);
      this.saveFavorite();
    },
    deleteFavorite(id: ID) {
      this.favorites.delete(id);
      this.saveFavorite();
    },
    restoreFavorite() {
      const rec = localStorage.getItem(STORAGE_KEY);
      if (rec === null) return;
      try {
        const list = JSON.parse(rec);
        this.favorites = new Set(list);
      } catch {}
    },
    saveFavorite() {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([...this.favorites.keys()])
      );
    },
  },
});
