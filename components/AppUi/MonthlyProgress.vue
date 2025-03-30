<script lang="ts" setup>
import {Progress} from "@/components/ui/progress"

const props = defineProps({

})   

const progress = computed(() => {
  const now = new Date();
  const totalDays = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate(); // Total days in the current month
  const currentDay = now.getDate(); // Current day
  return Math.round((currentDay / totalDays) * 100); // Calculate percentage
});
</script>

<template>
    <Progress :model-value="progress" class="h-1" />
</template>


