<script setup lang="ts">
import { GlowBorder } from "@/components/ui/glow-border"
import type { Work } from "@/types/work.type"

const props = defineProps<{
  currentWork?: Work | null
  status?: string
  error?: Error | null
}>()

const workStore = useMyWorkStore()

</script>

<template>
  <!-- Show skeleton while fetching -->
  <GlowBorder v-if="status === 'pending'"
    class="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden bg-background md:shadow-xl"
    :color="['#A07CFE', '#FE8FB5', '#FFBE7B']">
    <Skeleton class="w-full h-12" />
  </GlowBorder>

  <!-- If there is an active work -->
  <RouterLink v-else-if="currentWork" :to="`/work/${currentWork.id}`">
    <GlowBorder :duration="3000"
      class="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden bg-background md:shadow-xl"
      :color="['#5B3FCB', '#C6507A', '#C47A24']">
      <span
        class="pointer-events-none whitespace-pre-wrap text-center text-xl font-medium leading-none text-slate-900 dark:text-white">
        {{ currentWork.workName }}
      </span>
    </GlowBorder>

  </RouterLink>

  <!-- If no work is in progress -->
  <div v-else class="text-center text-gray-500">
    <p class="mb-4">There is no work in progress.</p>
    <Button variant="default" @click="workStore.toggleNewWorkDialog()">Create</Button>
  </div>

  <!-- Show error message if API fails -->
  <div v-if="error" class="text-red-500 text-center">
    Failed to load work: {{ error.message }}
  </div>
</template>
