<script setup lang="ts">
import { Play, Square } from "lucide-vue-next";

const props = defineProps<{
  data: {
    id: string;
    workName: string;
    noteContent: string | null;
    projectId: string;
    Timestamps: {
      status: "IS_TRACKING" | "PAUSED" | "IDLE";
      totalDuration: number;
    };
  };
}>();

const emit = defineEmits(["update-work"]); // Let parent handle refreshing the data

const loading = ref(false);

const toggleTracking = async () => {
  loading.value = true;

  try {
    if (props.data.Timestamps.status !== "IS_TRACKING") {
      // Start tracking
      await $fetch("/api/timestamp/start", {
        method: "POST",
        body: { workId: props.data.id },
      });
    } else {
      // Stop tracking
      await $fetch("/api/timestamp/stop-watch", {
        method: "PUT",
        body: { workId: props.data.id },
      });
    }

    emit("update-work"); // Parent should reload latest server data
  } catch (err) {
    console.error("Tracking error", err);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="border rounded-lg p-4 bg-white dark:bg-slate-900 shadow-sm">
    <div class="flex items-center justify-between gap-4">
      <!-- Left content: Work name and duration -->
      <div class="flex flex-col">
        <span class="text-base font-medium text-gray-900 dark:text-gray-100">
          {{ data.workName }}
        </span>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          {{ formatSecondsToReadableTime(data.Timestamps.totalDuration) }}
        </span>
      </div>

      <!-- Right content: Play/Square button -->
      <button
        @click="toggleTracking"
        :disabled="loading"
        class="rounded-full border p-3 transition duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
      >
        <Play v-if="data.Timestamps.status !== 'IS_TRACKING'" />
        <Square v-else />
      </button>
    </div>
  </div>
</template>
Í
