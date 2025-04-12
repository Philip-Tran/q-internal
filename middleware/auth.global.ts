import { authClient } from "~/server/utils/auth-client";

export default defineNuxtRouteMiddleware(async (to) => {
  const { data: session } = await authClient.useSession(useFetch);

  const publicPages = ["/login", "/sign-up"];
  const isPublic = publicPages.includes(to.path);
  const isLoggedIn = !!session.value;
  const isAdmin = session.value?.user?.role === "admin";

  // If not logged in, only allow public pages
  if (!isLoggedIn && !isPublic) {
    return navigateTo("/login");
  }

  // If logged in but not admin, only allow public pages
  if (isLoggedIn && !isAdmin && !isPublic) {
    return navigateTo("/login");
  }
});
