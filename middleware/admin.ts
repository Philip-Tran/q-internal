import { authClient } from "~/server/utils/auth-client";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { data: session } = await authClient.useSession(useFetch);

  if (!session.value) {
    if (to.path === "/") {
      return navigateTo("/login");
    }
  }
  if (session.value?.user?.role !== "admin") {
    if (to.path === "/") {
      return navigateTo("/login");
    }
  }
});
