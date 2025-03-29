<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <NuxtLoadingIndicator color="orange" :height=1 />

  <ClientOnly>
    <Toaster richColors class="pointer-events-auto" :duration=4500 position="top-center" />
  </ClientOnly>

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
