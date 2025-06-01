<script lang="ts" setup>
definePageMeta({
  layout: "sidebar-layout",
});

import { FetchKeys } from "~/constants/data-key";
import CurrentWorkCard from "./components/CurrentWorkCard.vue";
import PausedWorks from "./components/PausedWorks.vue";
import OkrCard from "./components/OkrCard.vue";
import { RandomQuote } from "./components/quote";
import { type Work } from "~/types/work.type";

const {
  data: currentWork,
  status: currentWorkStatus,
  error: currentWorkError,
} = await useFetch<Work | null>("/api/work/current", {
  method: "GET",
  key: FetchKeys.THE_CURRENT_WORK,
});

onActivated(() => {
  refreshNuxtData(FetchKeys.THE_CURRENT_WORK);
});

// Fetch Paused Work
const {
  status: pausedWorkStatus,
  data: pausedWorks,
  error: pausedWorkError,
  refresh: pausedWorkRefresh,
} = await useFetch<Work[] | null>("/api/work/paused", {
  method: "GET",
  key: FetchKeys.PAUSED_WORKS,
});

const refreshWorkCard = async () => {
  await refreshNuxtData(FetchKeys.THE_CURRENT_WORK);
};
</script>

<template>
  <div class="space-y-4">
    <RandomQuote />
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
      <OkrCard />
      <Card class="col-span-3">
        <CardHeader
          class="border-b flex flex-row h-[68px] items-center justify-between"
        >
          <CardTitle>Work</CardTitle>
          <AppCreateNewWorkDialog @newWorkCreated="refreshWorkCard" />
        </CardHeader>
        <CardContent class="p-6">
          <div class="flex flex-col space-y-10">
            <CurrentWorkCard
              :currentWork="currentWork"
              :status="currentWorkStatus"
              :error="currentWorkError"
            />
            <PausedWorks v-if="pausedWorks" :paused-works="pausedWorks" />
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<style></style>
