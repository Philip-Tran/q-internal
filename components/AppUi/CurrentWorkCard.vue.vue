<script lang="ts" setup>
interface Work {
  workName: string; // Use lowercase `string` (not `String`)
  status: string;
  id: string;
}

// Fetch the current work
const { status, data: CurrentWork, error } = await useFetch<Work | null>("/api/work/current", {
  method: "GET",
  lazy: true
});

import { GlowBorder } from "@/components/ui/glow-border";
</script>

<template>
  <!-- Show skeleton while fetching -->
  <GlowBorder
    v-if="status === 'pending'"
    class="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
    :color="['#A07CFE', '#FE8FB5', '#FFBE7B']"
  >
    <Skeleton class="w-full h-12" />
  </GlowBorder>

  <!-- If there is an active work -->
  <RouterLink v-else-if="CurrentWork?.id" :to="`/work/${CurrentWork.id}`">
    <GlowBorder
      class="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
      :color="['#A07CFE', '#FE8FB5', '#FFBE7B']"
    >
      <span
        class="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-4xl font-semibold leading-none text-transparent dark:from-white dark:to-zinc-700/75"
      >
        {{ CurrentWork.workName }}
      </span>
    </GlowBorder>
  </RouterLink>

  <!-- If no work is in progress -->
  <div v-else class="text-center text-gray-500">
    <p>There is no work in progress.</p>
    <RouterLink to="/work/create" class="mt-4 text-blue-600 hover:underline">
      Start a new work
    </RouterLink>
  </div>

  <!-- Show error message if API fails -->
  <div v-if="error" class="text-red-500 text-center">
    Failed to load work: {{ error.message }}
  </div>
</template>
