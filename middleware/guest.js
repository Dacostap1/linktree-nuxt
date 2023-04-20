import { useUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();

  console.log(`guest-too: ${to.fullPath}`);
  console.log(`guest-from: ${from.fullPath}`);

  if (to.fullPath == "/" && userStore.id) {
    return navigateTo("/admin");
  }

  if (to.fullPath == "/register" && userStore.id) {
    return navigateTo("/admin");
  }
});
