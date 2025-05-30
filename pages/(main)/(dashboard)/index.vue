<script lang="ts" setup>
definePageMeta({
  layout: "sidebar-layout"
})

import { FetchKeys } from "~/constants/data-key";
import CurrentWorkCard from "./components/CurrentWorkCard.vue";
import PausedWorks from "./components/PausedWorks.vue";
import OKRCard from "~/pages/(main)/(dashboard)/components/OKRCard.vue";
import { RandomQuote } from "~/pages/(main)/(dashboard)/components/quote";
import { type Work } from "~/types/work.type";

const workStore = useMyWorkStore()

const { data } = useNuxtData(FetchKeys.THE_CURRENT_WORK)
const { data: currentWork, status, error, refresh } = await useFetch<Work | null>("/api/work/current", {
  method: "GET",
  key: FetchKeys.THE_CURRENT_WORK,
  default() {
    return data.value
  }
})

// Fetch Paused Work
const { status: pausedWorkStatus, data: pausedWorks, error: pausedWorkError, refresh: pausedWorkRefresh } = await useFetch<Work | null>("/api/work/paused", {
  method: "GET",
  key: FetchKeys.PAUSED_WORKS
});

const refreshWorkCard = async () => {
  await refreshNuxtData(FetchKeys.THE_CURRENT_WORK)
}

</script>

<template>
  <div class="space-y-4">
    <RandomQuote />
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
      <OKRCard />
      <Card class="col-span-3">
        <CardHeader class="border-b flex flex-row h-[68px] items-center justify-between">
          <CardTitle>Work</CardTitle>
          <AppCreateNewWorkDialog @newWorkCreated="refreshWorkCard" />
        </CardHeader>
        <CardContent class="p-6">
          <div class="flex flex-col space-y-10">
            <CurrentWorkCard v-if="currentWork" :currentWork="currentWork" :status="status" :error="error" />
            <div v-else class="text-center text-gray-500">
              <p class="mb-4">There is no work in progress.</p>
              <Button variant="default" @click="workStore.openNewWorkDialog()">Create</Button>
            </div>
            <PausedWorks v-if="pausedWorks" :paused-works="pausedWorks" />
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<style></style>