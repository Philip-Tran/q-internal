<script setup lang="ts">
import type { AsyncDataRequestStatus } from "#app";
import { GlowBorder } from "@/components/ui/glow-border"
import type { Work } from "@/types/work.type"

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { toast } from "vue-sonner";
import { FetchKeys } from "~/constants/data-key";

const props = defineProps<{
  currentWork: Work,
  status?: AsyncDataRequestStatus
  error?: Error | null
}>()

const workStore = useMyWorkStore()

const onDeleteWork = async (workId: string) => {
  const data = await $fetch(`/api/work/${workId}`, {
    method: "DELETE"
  })

  if(data) {
    toast.info("Delete work successfully", {

    })

    await refreshNuxtData(FetchKeys.THE_CURRENT_WORK)
  }
}

</script>

<template>
  <ContextMenu>
    <ContextMenuContent>
      <ContextMenuItem @click="onDeleteWork(currentWork.id)">Delete work</ContextMenuItem>
    </ContextMenuContent>

    <!-- Show skeleton while fetching -->
    <GlowBorder v-if="status === 'pending'"
      class="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden bg-background md:shadow-xl"
      :color="['#A07CFE', '#FE8FB5', '#FFBE7B']">
      <Skeleton class="w-full h-12" />
    </GlowBorder>

    <!-- If there is an active work -->
    <ContextMenuTrigger v-else-if="currentWork">
      <RouterLink :to="`/work/${currentWork.id}`">
        <GlowBorder :duration="3000"
          class="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden bg-background md:shadow-xl"
          :color="['#5B3FCB', '#C6507A', '#C47A24']">
          <span
            class="pointer-events-none whitespace-pre-wrap text-center text-xl font-medium leading-none text-slate-900 dark:text-white">
            {{ currentWork.workName }}
          </span>
        </GlowBorder>
      </RouterLink>
    </ContextMenuTrigger>
  </ContextMenu>

  <!-- Show error message if API fails -->
  <div v-if="error" class="text-red-500 text-center">
    Failed to load work: {{ error.message }}
  </div>
</template>
