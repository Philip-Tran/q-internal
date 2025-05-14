<script lang="ts" setup>
definePageMeta({
  middleware: ["admin"]
})

import OkrCard from "~/components/home/okr-card/OkrCard.vue";
import { RandomQuote } from "~/components/home/quote";
import { type Work } from "~/types/work.type";

import { toast } from "vue-sonner";
const router = useRouter()

// Fetch Current Work
const { status: workStatus, data: currentWork, error: workError } = await useFetch<Work | null>("/api/work/current", {
  method: "GET",
  key: "currentWork",
});

// Fetch Paused Work
const { status: pausedWorkStatus, data: pausedWorks, error: pausedWorkError } = await useFetch<Work[] | null>("/api/work/paused", {
  method: "GET",
  key: "pausedWorks"
});

const onResumeClick = async (workId: string) => {
  const data = await $fetch("/api/work/un-paused", {
    method: 'POST',
    body: { id: workId }
  })

  toast.info("Unpaused work successfully", {
    action: {
      label: 'Start working',
      onClick: () => router.push(`/work/${workId}`)
    },
  })

  await refreshNuxtData("currentWork")

}

const refreshWorkCard = async () => {
  await refreshNuxtData("currentWork")
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
              <AppUiCurrentWorkCard :currentWork="currentWork" :status="workStatus" :error="workError" />
              <div v-if="pausedWorks" class="flex flex-col space-y-6">
                <Label>Paused Work</Label>
                <div class="flex flex-col space-y-4">
                  <div v-for="(pausedWork, index) in pausedWorks" :key="index"
                    class="p-3 rounded-lg bg-amber-300 bg-opacity-30 border flex space-x-4 items-center justify-start">
                    <Button variant="secondary" class="hover:bg-primary" size="xs"
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