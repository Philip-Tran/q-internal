<script lang="ts" setup>
definePageMeta({
  middleware: ["admin"]
})

import { type Work } from "~/types/work.type";

import { ArrowBigUpDash, Crosshair, Goal, Pencil } from "lucide-vue-next";
import { toast } from "vue-sonner";

// Fetch OKRs
const { status: okrsStatus } = await useFetch("/api/okrs/current", {
  method: "GET",
  lazy: true,
  key: "currentOKRs"
});
const { data: currentOKRs } = useNuxtData("currentOKRs");

// Fetch Current Work
const { status: workStatus, data: currentWork, error: workError } = await useFetch<Work | null>("/api/work/current", {
  method: "GET",
  lazy: true,
  key: "currentWork"
});

// Fetch Paused Work
const { status: pausedWorkStatus, data: pausedWork, error: pausedWorkError } = await useFetch<Work | null>("/api/work/paused", {
  method: "GET",
  lazy: true,
  key: "pausedWork"
});

const monthTimePercentage = getMonthProgressPercentage();

const onResumeClick = async (workId: string) =>  {
 const data = await $fetch("/api/work/un-paused", {
  method: 'POST',
   body: { id: workId}
 })

 if(data) {
  toast.info("Unpaused work successfully", {
    action: () => {
      "start"
    }
  })
 }
}
</script>

<template>
  <div class="space-y-4">
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card v-for="i in 4">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">
            Subscriptions
          </CardTitle>
          <Goal />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            +2350
          </div>
          <p class="text-xs text-muted-foreground">
            +180.1% from last month
          </p>
        </CardContent>
      </Card>
    </div>

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card class="col-span-4">
        <CardHeader class="border-b-2">
          <CardTitle>This month goal</CardTitle>
        </CardHeader>
        <p v-if="okrsStatus === 'pending'">Is loading</p>
        <template v-else>
          <CardContent class="p-6 relative">
            <div class="flex flex-col space-y-8">
              <div v-for="okr in currentOKRs" :key="okr.id" class="flex flex-col space-y-5">
                <div class="flex space-x-4 justify-between">
                  <div class="flex space-x-3 justify-center items-center">
                    <div class="flex justify-center items-center">
                      <Crosshair />
                    </div>
                    <h2 class="font-serif text-2xl font-medium">
                      {{ okr.name }}
                    </h2>
                  </div>
                  <div>
                    <AnimatedCircularProgressBar :max="100" :min="0" :value="okr.progressOnTotalKeyResult"
                      :circleStrokeWidth=8 class="w-[60px] h-[60px] text-lg" />
                  </div>
                </div>
                <div>
                  <Progress :model-value="monthTimePercentage" class="h-2" />
                </div>
                <div class="absolute -top-6 -right-2">
                  <RouterLink :to="`/okrs/edit/${okr.id}`">
                    <Button size="icon" variant="ghost">
                      <Pencil class="stroke-slate-400 hover:stroke-yellow-600" />
                    </Button>
                  </RouterLink>
                </div>
                <div>
                  <RouterLink :to="`/progress/${okr.id}`">
                    <Button variant="secondary">
                      <span>Update</span>
                      <ArrowBigUpDash />
                    </Button>
                  </RouterLink>
                </div>
              </div>
            </div>
          </CardContent>
        </template>
      </Card>
      <Card class="col-span-3">
        <CardHeader class="border-b py-2 flex flex-row items-center justify-between">
          <CardTitle>Current</CardTitle>
          <AppUiCreateNewWorkDialog />
        </CardHeader>
        <CardContent class="p-6">
          <div class="">
            <div class="flex flex-col space-y-10">
              <AppUiCurrentWorkCard :currentWork="currentWork" :status="workStatus" :error="workError" />
              <div v-if="pausedWork" class="flex flex-col space-y-2">
                <Label>Paused Work</Label>
                <div >
                  <h6>{{ pausedWork?.workName }}</h6>
                  <Button variant="link" @click="onResumeClick(pausedWork.id)">Resume</Button>
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