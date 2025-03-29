<script setup lang="ts">
import { cn } from '@/lib/utils'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'New OKRs', path: '/new-okrs' },
  { name: 'Settings', path: '/settings' }
]
</script>

<template>
  <nav :class="cn('flex items-center space-x-4 lg:space-x-6', $attrs.class ?? '')">
    <NuxtLink
      v-for="link in navLinks"
      :key="link.path"
      :to="link.path"
      class="text-sm font-medium transition-colors hover:text-primary"
      :class="{ 'text-muted-foreground': link.path !== '/' }"
    >
      {{ link.name }}
    </NuxtLink>
  </nav>
</template>
