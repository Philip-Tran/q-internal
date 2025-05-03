<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <!-- <NuxtLoadingIndicator color="black" :height=1 /> -->

  <ClientOnly>
    <Toaster richColors class="pointer-events-auto" :duration=4500 position="top-center" />
  </ClientOnly>

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.1s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(.25rem);
}
</style>
