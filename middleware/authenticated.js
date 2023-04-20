import { useUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();

  console.log(`auth-too: ${to.fullPath}`);
  console.log(`auth-from: ${from.fullPath}`);

  if (to.path !== "/" && !userStore.id) {
    return navigateTo("/");
  }
});
