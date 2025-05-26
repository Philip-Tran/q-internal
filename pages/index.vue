<script lang="ts" setup>
definePageMeta({
  middleware: ["admin"]
})

import { FetchKeys } from "~/constants/data-key";

import OkrCard from "~/components/home/okr-card/OkrCard.vue";
import { RandomQuote } from "~/components/home/quote";
import { type Work } from "~/types/work.type";

const workStore = useMyWorkStore()
import { toast } from "vue-sonner";
const router = useRouter()

// Fetch Paused Work
const { status: pausedWorkStatus, data: pausedWorks, error: pausedWorkError, refresh: refreshPausedWorks } = await useFetch<Work[] | null>("/api/work/paused", {
  method: "GET",
  key: FetchKeys.PAUSED_WORKS
});

const { data: currentWork, status, error } = await useFetch("/api/work/current", {
  key: FetchKeys.THE_CURRENT_WORK,
})

const onResumeClick = async (workId: string) => {
  const data = await $fetch("/api/work/un-paused", {
    method: 'POST',
    body: { id: workId }
  })

  await refreshNuxtData(FetchKeys.THE_CURRENT_WORK)
  refreshPausedWorks()

  toast.info("Unpaused work successfully", {
    action: {
      label: 'Start working',
      onClick: () => router.push(`/work/${workId}`)
    },
  })
}

const refreshWorkCard = async () => {
  await refreshNuxtData(FetchKeys.THE_CURRENT_WORK)
}

</script>

<template>
  <div class="space-y-4">
    <RandomQuote />
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
      <OkrCard />
      <Card class="col-span-3">
        <CardHeader class="border-b flex flex-row h-[68px] items-center justify-between">
          <CardTitle>Work</CardTitle>
          <AppUiCreateNewWorkDialog @newWorkCreated="refreshWorkCard" />
        </CardHeader>
        <CardContent class="p-6">
          <div class="">
            <div class="flex flex-col space-y-10">
              <AppUiCurrentWorkCard v-if="currentWork" :currentWork="currentWork" :status="status" :error="error" />
              <div v-else class="text-center text-gray-500">
                <p class="mb-4">There is no work in progress.</p>
                <Button variant="default" @click="workStore.toggleNewWorkDialog()">Create</Button>
              </div>
              <div v-if="pausedWorks" class="flex flex-col space-y-6">
                <Label>Paused Work</Label>
                <div class="flex flex-col space-y-4">
                  <div v-for="(pausedWork, index) in pausedWorks" :key="index"
                    class="p-3 rounded-lg bg-amber-300 bg-opacity-30 border flex space-x-4 items-center justify-start">
                    <Button variant="secondary" class="rounded-full" size="xs"
                      @click="onResumeClick(pausedWork.id)">Resume</Button>
                    <p>{{ pausedWork?.workName }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<style></style>