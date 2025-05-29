<script setup lang="ts">
import { authClient } from '~/server/utils/auth-client';

import { cn } from '@/lib/utils'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'


// Define Zod Schema
const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().nonempty().email('Invalid email address'),
  password: z.string().nonempty().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

// Use VeeValidate with the schema
const { defineField, handleSubmit, errors, isSubmitting, values } = useForm({
  validationSchema: toTypedSchema(signupSchema),
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword')

const onSubmit = handleSubmit(async (values) => {
  await authClient.signUp.email({
    email: values.email,
    name: values.name,
    password: values.password,
    callbackURL: "/login"
  })
})
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit" class="grid gap-4">
      <!-- Name Field -->
      <div class="grid gap-1">
        <Label for="name">Name</Label>
        <Input id="name" v-model="name" v-bind="nameAttrs" placeholder="John Doe" type="text"
          :disabled="isSubmitting" />
        <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
      </div>

      <!-- Email Field -->
      <div class="grid gap-1">
        <Label for="email">Email</Label>
        <Input id="email" v-model="email" v-bind="emailAttrs" placeholder="name@example.com" type="email"
          auto-complete="email" :disabled="isSubmitting" />
        <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
      </div>

      <!-- Password Field -->
      <div class="grid gap-1">
        <Label for="password">Password</Label>
        <Input id="password" v-model="password" v-bind="passwordAttrs" type="password" placeholder="••••••••"
          :disabled="isSubmitting" />
        <p v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</p>
      </div>

      <!-- Confirm Password Field -->
      <div class="grid gap-1">
        <Label for="confirm-password">Confirm Password</Label>
        <Input id="confirm-password" v-model="confirmPassword" v-bind="confirmPasswordAttrs" type="password"
          placeholder="••••••••" :disabled="isSubmitting" />
        <p v-if="errors.confirmPassword" class="text-red-500 text-sm">{{ errors.confirmPassword }}</p>
      </div>

      <!-- Submit Button -->
      <Button type="submit" :disabled="isSubmitting">
        <LucideSpinner v-if="isSubmitting" class="mr-2 h-4 w-4 animate-spin" />
        Sign Up
      </Button>
    </form>
  </div>
</template>
