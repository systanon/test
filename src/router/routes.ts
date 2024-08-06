import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [

  {
    path: "/todos/",
    name: "TodosPage",
    meta: { accessMode: "public" },
    children: [],
    component: () =>  import("../views/TodosPage.vue"),
  },
  {
    path: "/",
    name: "SignInForm",
    meta: { accessMode: "public" },
    component: () =>  import("../views/SignInPage.vue"),
  },
  {
    path: "/todos/create-todo",
    name: "CreateTodoPage",
    meta: { accessMode: "public" },
    children: [],
    component: () =>  import("../views/CreateTodoPage.vue"),
  },
];
export { routes };
