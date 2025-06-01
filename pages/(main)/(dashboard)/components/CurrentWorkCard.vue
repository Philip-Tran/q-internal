<script setup lang="ts">
import type { AsyncDataRequestStatus } from "#app";
import { GlowBorder } from "@/components/ui/glow-border";
import type { Work } from "@/types/work.type";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { toast } from "vue-sonner";
import { FetchKeys } from "~/constants/data-key";

const props = defineProps<{
  currentWork: Work | null;
  status?: AsyncDataRequestStatus;
  error?: Error | null;
}>();

const workStore = useMyWorkStore();

const onDeleteWork = async (workId: string) => {
  const data = await $fetch(`/api/work/${workId}`, {
    method: "DELETE",
  });

  if (data) {
    toast.info("Delete work successfully", {});
    await refreshNuxtData(FetchKeys.THE_CURRENT_WORK);
  }
};

// FIXED: Better state management
const isLoading = computed(() => {
  return props.status === 'pending' && !props.currentWork;
});

const hasWork = computed(() => {
  return props.currentWork && !props.error;
});

const shouldShowNoWork = computed(() => {
  return !props.currentWork && props.status !== 'pending' && !props.error;
});

// FIXED: Add debugging (remove in production)
watch(() => props.currentWork, (newVal, oldVal) => {
  console.log('CurrentWork changed:', { old: oldVal, new: newVal });
});

watch(() => props.status, (newVal) => {
  console.log('Status changed:', newVal);
});
</script>

<template>
  <!-- Show loading only when actually loading and no data -->
  <div v-if="isLoading" class="text-center text-gray-500">
    <div class="flex items-center justify-center space-x-2">
      <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
      <span>Loading work...</span>
    </div>
  </div>

  <!-- Show error message if API fails -->
  <div v-else-if="error" class="text-red-500 text-center">
    <p class="mb-2">Failed to load work: {{ error.message }}</p>
    <Button variant="outline" size="sm" @click="refreshNuxtData(FetchKeys.THE_CURRENT_WORK)">
      Retry
    </Button>
  </div>

  <!-- Show the work card if currentWork exists -->
  <ContextMenu v-else-if="hasWork">
    <ContextMenuContent>
      <ContextMenuItem @click="onDeleteWork(currentWork!.id)">
        Delete work
      </ContextMenuItem>
    </ContextMenuContent>

    <ContextMenuTrigger>
      <RouterLink :to="`/work/${currentWork!.id}`">
        <GlowBorder
          :duration="3000"
          class="relative flex md:h-[240px] 2xl:h-[300px] w-full flex-col items-center justify-center overflow-hidden bg-background md:shadow-xl"
          :color="['#5B3FCB', '#C6507A', '#C47A24']"
        >
          <span
            class="pointer-events-none whitespace-pre-wrap text-center text-base md:text-base 2xl:text-xl font-regular leading-none text-slate-900 dark:text-white"
          >
            {{ currentWork?.workName }}
          </span>
        </GlowBorder>
      </RouterLink>
    </ContextMenuTrigger>
  </ContextMenu>

  <!-- Show no work message only when explicitly no work and not loading -->
  <div v-else-if="shouldShowNoWork" class="text-center text-gray-500">
    <p class="mb-4">There is no work in progress.</p>
    <Button variant="default" @click="workStore.openNewWorkDialog()">
      Create
    </Button>
  </div>
</template>