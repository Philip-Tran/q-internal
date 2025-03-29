<script setup lang="ts">
import { cn } from '@/lib/utils'
import { type HTMLAttributes } from "vue";

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'New OKRs', path: '/new-okrs' },
  { name: 'Current work', path: '/current-work' },
  { name: 'Settings', path: '/settings' }
]

type Orientation = "horizontal" | "vertical";

interface NavProps {
  class?: HTMLAttributes["class"];
  orientation?: Orientation;
}

const props = withDefaults(defineProps<NavProps>(), {
  orientation: "horizontal",
});

// Compute classes based on orientation
const navClasses = computed(() => {
  return props.orientation === "horizontal"
    ? "flex items-center space-x-4 lg:space-x-6"
    : "flex flex-col space-y-4";
});
</script>

<template>
  <nav :class="cn(navClasses, $attrs.class ?? '')">
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