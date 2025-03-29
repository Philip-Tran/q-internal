<template>
  <div>
    haha
  </div>
</template>

<script lang="ts" setup>
import { authClient } from "@/lib/auth-client"; //import the auth client

const { data, error } = await authClient.signUp.email({
  email: "tranquyethealing@gmail.com", // user email address
  password: "Tranquyet", // user password -> min 8 characters by default
  name: "Quyet", // user display name
  //  image, // user image url (optional)
  callbackURL: "/" // a url to redirect to after the user verifies their email (optional)
}, {
  onRequest: (ctx) => {
    //show loading
  },
  onSuccess: (ctx) => {
    //redirect to the dashboard or sign in page
    console.log("sign up successfully")
  },
  onError: (ctx) => {
    // display the error message
    alert(ctx.error.message);
  },
});

console.log(data)
</script>

<style></style>