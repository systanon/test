import {
  NavigationGuard,
  RouteLocationNormalized,
  createRouter,
  createWebHistory,
} from "vue-router";

// import { AuthState } from "@/store/modules/auth.types";
// import { UserProfile } from "@/types/profile";
// import authStore from "@/store/modules/auth.store";
import { routes } from "./routes";
// import store from "@/store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
// const canUserAccess = async (
//   to: RouteLocationNormalized,
//   isAuthenticated: boolean,
//   profile: UserProfile | null
// ) => {
//   const { accessMode = "public", accessRoles = [] } = to.meta;
//   const { roles: userRoles = [] } = profile || {};

//   if (accessMode === "only-for-unauthorized" && !isAuthenticated) {
//     return true;
//   }
//   if (accessMode === "only-for-unauthorized" && isAuthenticated) {
//     return false;
//   }

//   if (accessMode === "private" && !isAuthenticated) {
//     return false;
//   }
//   if (accessMode === "private" && isAuthenticated) {
//     return accessRoles.length === 0
//       ? true
//       : accessRoles.some((role) => userRoles.includes(role));
//   }
//   return false;
// };

// export const redirectWhenNoAccessToRoute = async (
//   route = router.currentRoute.value
// ) => {
//   const { accessMode = "public" } = route.meta;
//   if (accessMode === "public") return;

//   const { profileLoading, profile } = authStore.state as AuthState;
//   await profileLoading;

//   const canAccess = await canUserAccess(
//     route,
//     store.getters["auth/isLogged"],
//     profile
//   );
//   if (canAccess) return;

//   console.log("Redirect because there is no access to the route.");
//   if (accessMode === "private") router.push({ name: "SignIn" });
//   if (accessMode === "only-for-unauthorized") router.push({ name: "Profile" });
// };

// const navigationGuard: NavigationGuard = async (to, from) => {
//   const { accessMode = "public" } = to.meta;
//   if (from.fullPath === to.fullPath && from.name === to.name) return false;

//   if (accessMode === "public") return true;

//   const { profileLoading, profile } = authStore.state as AuthState;
//   await profileLoading;

//   const canAccess = await canUserAccess(
//     to,
//     store.getters["auth/isLogged"],
//     profile
//   );
//   if (!canAccess) {
//     const canAccess = await canUserAccess(
//       from,
//       store.getters["auth/isLogged"],
//       profile
//     );
//     if (!canAccess) {
//       return { name: "PageHome" };
//     }

//     return false;
//   }

//   return true;
// };

// router.beforeEach(navigationGuard);

export default router;
