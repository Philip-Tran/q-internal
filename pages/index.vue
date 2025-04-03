<script lang="ts" setup>
definePageMeta({
  middleware: ["admin"]
})

import { Crosshair, Goal } from "lucide-vue-next";

interface Work {
  name: string;
  status: string;
  id: string;
}

// Fetch session data
//const { data: session, isPending: isSessionPending } = await authClient.useSession(useFetch);

// Fetch OKRs
const { status: okrsStatus } = await useFetch("/api/okrs/current", {
  method: "GET",
  lazy: true,
  // cache: "reload",
  key: "currentOKRs"
});
const { data: currentOKRs } = useNuxtData("currentOKRs");

// Fetch Current Work
const { status: workStatus, data: currentWork, error: workError } = await useFetch<Work | null>("/api/work/current", {
  method: "GET",
  lazy: true,
  key: "currentWork"
});

const monthTimePercentage = getMonthProgressPercentage();
</script>


<template>
  <div>
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
            <CardContent class="p-6">
              <div class="flex flex-col space-y-8">
                <div v-for="okr in currentOKRs" :key="okr.id" class="flex flex-col space-y-5">
                  <div  class="flex space-x-4 justify-between">
                    <div class="flex space-x-3 justify-center items-center">
                      <div class="flex justify-center items-center">
                        <Crosshair />
                      </div>
                      <div>
                        <h2 class="font-serif text-2xl font-medium">
                          {{ okr.name }}
                        </h2>
                      </div>
                    </div>
                    <div>
                      <AnimatedCircularProgressBar :max="100" :min="0" :value="60" :circleStrokeWidth=8 class="w-[60px] h-[60px] text-lg"/>
                    </div>
                  </div>
                  <div>
                    <Progress  :model-value="monthTimePercentage" class="h-2"/>
                  </div>
                </div>
              </div>
            </CardContent>
          </template>
        </Card>
        <Card class="col-span-3">
          <CardHeader class="border-b py-2 flex flex-row items-center justify-between">
            <CardTitle>Current</CardTitle>
            <AppUiCreateNewWorkDialog/>
          </CardHeader>
          <CardContent class="p-6">
            <div class="">
              <AppUiCurrentWorkCard :currentWork="currentWork" :status="workStatus" :error="workError"/>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
  <div class="bg-green-400">
  </div>
</template>


<style></style>