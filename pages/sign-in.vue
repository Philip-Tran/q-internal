<template>
  <div>
    sign in page
    <Button @click="HandleLoginUser">Sign in </Button>
    <Button @click="HandleSignInGit">Sign in with github</Button>
  </div>
</template>

<script lang="ts" setup>
import { authClient } from "~/lib/auth-client"
const HandleLoginUser = async () => {
  await authClient.signIn.email({
    email: "quyetcoccoc@gmail.com",
    password: "Tranquyet",
    callbackURL: "/",
    fetchOptions: {
      onError: (context) => {
        console.error(context.error.message)
      },
    },
  });
};

const HandleSignInGit = async () => {
  const data = await authClient.signIn.social({
    provider: "github"
  })

  console.log(data)
}
</script>

<style></style>