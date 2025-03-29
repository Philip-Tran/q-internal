import { authClient } from "~/lib/auth-client";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const loginState = ref({
    Credential: {
      email: "",
      password: "",
    },
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  });

  const loginAction = async (callbackURL: string) => {
    await authClient.signIn.email({
      email: loginState.value.Credential.email,
      password: loginState.value.Credential.password,
      callbackURL,
      fetchOptions: {
        onError: (context) => {
          console.error(context.error.message);
          loginState.value.isError = true;
          loginState.value.message = context.error.message;
        },
      },
    });
  };

  return { loginState, loginAction };
});
