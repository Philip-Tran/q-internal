<script setup lang="ts">
definePageMeta({
  layout: "auth-layout"
})

import { useAuthStore } from "../../stores/auth/auth.store";
import { toast } from 'vue-sonner'

import { authClient } from '~/server/utils/auth-client';
const authStore = useAuthStore();
const { loginState } = storeToRefs(authStore)

const email = ref('');
const password = ref('');

const handleLogin = async () => {
  await authClient.signIn.email({
    email: email.value,
    password: password.value,
    callbackURL: "/",
    fetchOptions: {
      onError: (context) => {
        console.error(context.error.message);
        toast.error(context.error.message, {
          description: 'Try again',
        })
        loginState.value.isError = true;
        loginState.value.message = context.error.message;
      },
      onSuccess: (context) => {
        toast.info('Login successfully', {
          description: 'Redirecting to Home Page',
          // action: {
          //   label: 'Undo',
          //   onClick: () => console.log('Undo'),
          // },
        })
      }
    },
  });
};
</script>

<template>
  <div class="flex h-screen w-full items-center justify-center px-4">
    <Card class="mx-auto max-w-sm w-[500px]">
      <CardHeader>
        <CardTitle class="text-2xl">
          Login
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleLogin">
          <div class="grid gap-4">
            <div class="grid gap-2">
              <Label for="email">Email</Label>
              <Input v-model="email" id="email" type="email" required />
            </div>
            <div class="grid gap-2">
              <div class="flex items-center">
                <Label for="password">Password</Label>
              </div>
              <Input v-model="password" id="password" type="password" required />
            </div>
            <Button type="submit" class="w-full" @keydown.enter="handleLogin">
              Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<style></style>
