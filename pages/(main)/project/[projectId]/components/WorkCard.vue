<script setup lang="ts">
import { Play, Square } from "lucide-vue-next";
import { cn } from "@/lib/utils";

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

const emit = defineEmits(["update-work"]);

const loading = ref(false);
const currentSessionTime = ref(0);
const timerInterval = ref<NodeJS.Timeout | null>(null);

const isTracking = computed(
  () => props.data.Timestamps.status === "IS_TRACKING"
);

// Format seconds to readable time (HH:MM:SS)
const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${minutes.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

// Start the live timer
const startTimer = () => {
  if (timerInterval.value) return;

  timerInterval.value = setInterval(() => {
    currentSessionTime.value++;
  }, 1000);
};

// Stop the live timer
const stopTimer = () => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
    timerInterval.value = null;
  }
};

// Watch for tracking status changes
onMounted(() => {
  watch(
    isTracking,
    (newValue) => {
      if (newValue) {
        currentSessionTime.value = 0; // Reset session time when starting
        startTimer();
      } else {
        stopTimer();
        currentSessionTime.value = 0;
      }
    },
    { immediate: true }
  );
});

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
    emit("update-work");
  } catch (err) {
    console.error("Tracking error", err);
  } finally {
    loading.value = false;
  }
};

// Cleanup timer on unmount
onUnmounted(() => {
  stopTimer();
});

</script>

<template>
  <div :class="cn('relative flex flex-col items-end')">
    <!-- Live Timer Display -->
    <div
      v-if="isTracking"
      :class="
        cn(
          'mb-2 px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-mono'
        )
      "
    >
      {{ formatTime(currentSessionTime) }}
    </div>

    <div
      :class="
        cn(
          'border w-full rounded-lg p-4 bg-white dark:bg-slate-900 shadow-sm transition-all duration-200',
          isTracking && 'border-green-500 dark:border-green-400 shadow-md'
        )
      "
    >
      <div class="flex items-center justify-between gap-4">
        <!-- Left content: Work name and total duration -->
        <div class="flex flex-col">
          <span class="text-base font-medium text-gray-900 dark:text-gray-100">
            {{ data.workName }}
          </span>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            Total:
            {{ formatSecondsToReadableTime(data.Timestamps.totalDuration) }}
          </span>
        </div>

        <!-- Right content: Play/Square button -->
        <button
          @click="toggleTracking"
          :disabled="loading"
          :class="
            cn(
              'rounded-full border p-3 transition duration-200 hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-800 disabled:opacity-50',
              isTracking &&
                'bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-400'
            )
          "
        >
          <Play
            v-if="data.Timestamps.status !== 'IS_TRACKING'"
            :class="cn('w-5 h-5')"
          />
          <Square
            v-else
            :class="cn('w-5 h-5 text-green-600 dark:text-green-400')"
          />
        </button>
      </div>
    </div>
  </div>
</template>
