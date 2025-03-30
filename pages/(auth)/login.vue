<script setup>
definePageMeta({
  layout: ["auth-layout"]
})

import { useAuthStore } from "../../stores/auth/auth.store";
import { toast } from 'vue-sonner'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const authStore = useAuthStore();
const { loginState } = storeToRefs(authStore)
const email = ref('');
const password = ref('');

const login = () => {
  authStore.login({ email: loginState.value.Credential.email, password: loginState.value.Credential.password });
  console.log(email.value, password.value);
};

import { authClient } from '~/server/utils/auth-client';

const handleLogin = async () => {
  await authClient.signIn.email({
    email: email.value,
    password: password.value,
    callbackURL: "/",
    fetchOptions: {
      onError: (context) => {
        console.error(context.error.message);
        toast.error(context.error.message, {
          description: 'Please try again',
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
    <Card class="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">
          Login
        </CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleLogin">
          <div class="grid gap-4">
            <div class="grid gap-2">
              <Label for="email">Email</Label>
              <Input v-model="email" id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div class="grid gap-2">
              <div class="flex items-center">
                <Label for="password">Password</Label>
                <a href="#" class="ml-auto inline-block text-sm underline">
                  Forgot password?
                </a>
              </div>
              <Input v-model="password" id="password" type="password" required />
            </div>
            <Button type="submit" class="w-full">
              Login
            </Button>
            <!-- <Button variant="outline" class="w-full">
              Login with Google
            </Button> -->
          </div>
        </form>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <a href="#" class="underline">
            Sign up
          </a>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<style></style>
