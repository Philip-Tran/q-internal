<template>
  <div>
    Create new user here
  </div>
  <Button @click="newUser">admin create user</Button>
</template>

<script setup>
import { authClient } from '~/lib/auth-client';

const newUser = async () => {
  try {
    const user = await authClient.admin.createUser({
      name: "Test Ufser",
      email: "tes2@example.com",
      password: "password123",
      role: "user",
      data: {
        customField: "customValue",
      },
    });
    console.log("User created:", user);
  } catch (error) {
    console.error("Error creating user:", error);
  }
};
</script>

<style>
</style>
