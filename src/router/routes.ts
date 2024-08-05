// import PageHome from "../views/PageHome.vue";
import UsersPage from "../views/UsersPage.vue";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: "/",
  //   name: "PageHome",
  //   meta: { accessMode: "public" },
  //   component: PageHome,
  // },
  // {
  //   path: "/",
  //   name: "UsersPage",
  //   meta: { accessMode: "public" },
  //   component: UsersPage,
  // },
  {
    path: "/todos/:userId",
    name: "TodosPage",
    meta: { accessMode: "public" },
    children: [],
    component: () =>  import("../views/TodosPage.vue"),
  },
  // {
  //   path: "/",
  //   name: "PostsPage",
  //   meta: { accessMode: "public" },
  //   children: [],
  //   component: () =>  import("../views/PostsPage.vue"),
  // },
  {
    path: "/",
    name: "SignInForm",
    meta: { accessMode: "public" },
    component: () =>  import("../views/SignInPage.vue"),
  },
  // {
  //   path: "/profile",
  //   name: "Profile",
  //   meta: { accessMode: "private" },
  //   children: [],
  //   component: () =>
  //     import("../views/PageProfile.vue"),
  // },
  // {
  //   path: "/notes",
  //   component: () =>
  //     import("../views/LayoutNotes.vue"),
  //   children: [
  //     {
  //       path: "",
  //       name: "Notes",
  //       meta: { accessMode: "private" },
  //       component: () =>
  //         import("../views/PageNotes.vue"),
  //     },
  //     {
  //       path: "create-note",
  //       name: "CreateNote",
  //       meta: { accessMode: "private" },
  //       component: () =>
  //         import("../views/PageCreateNote.vue"),
  //     },
  //     {
  //       path: "replace-note/:id",
  //       name: "ReplaceNote",
  //       meta: { accessMode: "private" },
  //       component: () =>
  //         import(
  //           "../views/PageReplaceNote.vue"
  //         ),
  //     },
  //   ],
  // },
  // {
  //   path: "/todo-list",
  //   name: "TodoList",
  //   meta: { accessMode: "public" },
  //   component: () =>
  //     import("../views/TodoList.vue"),
  // },
  // {
  //   path: "/sign-up",
  //   name: "SignUp",
  //   meta: { accessMode: "only-for-unauthorized" },
  //   component: () =>
  //     import("../views/PageSignUp.vue"),
  // },
  // {
  //   path: "/sign-in",
  //   name: "SignIn",
  //   meta: { accessMode: "only-for-unauthorized" },
  //   component: () =>
  //     import("../views/PageSignIn.vue"),
  // },
  // {
  //   path: "/:patchMath(.*)*",
  //   name: "not-found",
  //   meta: { accessMode: "public" },
  //   component: () => import("@/views/PageNotFound.vue"),
  // },
];
export { routes };
