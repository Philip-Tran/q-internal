<script lang="ts" setup>
definePageMeta({
  layout: "auth-layout"
})

import SignUpForm from "./components/SignUpForm.vue"
</script>

<template>
  <div class="flex flex-1 min-h-screen items-center justify-center">
    <div class="container mx-auto items-center justify-center"> 
      <SignUpForm class="max-w-[500px]"/>
    </div>
  </div>
</template>