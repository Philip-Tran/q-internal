<template>
  <div>
    Create new user here
  </div>
  <Button @click="newUser">admin create user</Button>
</template>

<script setup>
import { authClient } from '~/server/utils/auth-client';

const newUser = async () => {
  try {
    const user = await authClient.admin.createUser({
      name: "Test Ufser",
      email: "phil.tranquyet@gmail.com",
      password: "Tranquyetrc213v",
      role: "admin",
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
