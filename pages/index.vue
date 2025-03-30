<script lang="ts" setup>
definePageMeta({
  middleware: ["admin"]
})
import { Crosshair, Goal } from "lucide-vue-next";
import { authClient } from "~/lib/auth-client";
import { Progress } from '@/components/ui/progress'

import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progressbar"

const { data: session, isPending } = await authClient.useSession(useFetch);

const { status, data } = await useLazyFetch("/api/okrs/current", {
  method: "GET",
})

//
import { ref, onMounted, onBeforeUnmount } from "vue";
const value = ref(0);

function handleIncrement(prev: number) {
  return prev === 100 ? 0 : prev + 10;
}

onMounted(() => {
  value.value = handleIncrement(value.value);
  const interval = setInterval(() => {
    value.value = handleIncrement(value.value);
  }, 500);

  onBeforeUnmount(() => clearInterval(interval));
});

const monthTimePercentage = getMonthProgressPercentage()
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
          <p v-if="status === 'pending'">Is loading</p>
          <template v-else>
            <CardContent class="p-6">
              <div class="flex flex-col space-y-8">
                <div v-for="goal in data?.data" class="flex flex-col space-y-5">
                  <div  class="flex space-x-4 justify-between">
                    <div class="flex space-x-3 justify-center items-center">
                      <div class="flex justify-center items-center">
                        <Crosshair />
                      </div>
                      <div>
                        <h2 class="font-serif text-2xl font-medium">
                          {{ goal.name }}
                        </h2>
                      </div>
                    </div>
                    <div>
                      <AnimatedCircularProgressBar :max="100" :min="0" :value="60" circleStrokeWidth="7" class="w-[60px] h-[60px] text-lg"/>
                    </div>
                  </div>
                  <div>
                    <Progress  :model-value="monthTimePercentage" class="h-1"/>
                  </div>
                </div>
              </div>
            </CardContent>
          </template>
        </Card>
        <Card class="col-span-3">
          <CardHeader class="border-b py-2 flex flex-row items-center justify-between">
            <CardTitle>Current work</CardTitle>
            <AppUiCreateNewWorkDialog/>
          </CardHeader>
          <CardContent class="p-6">
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
  <div class="bg-green-400">
    <pre>{{ session?.user }}</pre>
  </div>
</template>


<style></style>