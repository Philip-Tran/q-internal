<script setup lang=ts>
import { ArrowBigUpDash, Crosshair, Pencil } from 'lucide-vue-next';

const monthTimePercentage = getMonthProgressPercentage();
const okrStore = useOKRsGetStore()

if (okrStore.okrs == null) {
  okrStore.getOKRs()
}

const { data: setting } = await useFetch("/api/setting", {
  method: "get"
})

const isOpen = ref(false)

const today = getCurrentWeekday()

</script>

<template>
  <Card class="col-span-4">
    <CardHeader class="border-b h-[68px]">
      <CardTitle>This month goal</CardTitle>
    </CardHeader>
    <div>
      <CardContent class="p-6 relative">
        <div class="flex flex-col space-y-8">
          <div v-if="okrStore.state.isLoading">
            <Skeleton class="w-full h-24 rounded-md bg-gray-100" />
          </div>
          <div v-else-if="okrStore.okrs[0] == null" class="h-full w-full flex">
            <div class="flex flex-col w-full justify-center space-y-4 align-middle">
              <p class="text-destructive">No OKRs set for this month</p>
              <NuxtLink to="/new-okrs">
                <Button class="w-fit">
                  Create
                </Button>
              </NuxtLink>
            </div>
          </div>
          <div v-else v-for="okr in okrStore.okrs" :key="okr.id" class="flex flex-col space-y-5">
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
                <AnimatedCircularProgressBar :max="100" :show-percentage="true" :min="0"
                  :value="okr.progressOnTotalKeyResult == null ? 0 : okr.progressOnTotalKeyResult" :circleStrokeWidth=8
                  class="w-[60px] h-[60px] text-lg text-gray-700" />
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
            <div class="flex space-x-6">
              <Collapsible v-model:open="isOpen">
                <CollapsibleTrigger>
                  <Button variant="outline">
                    Detail
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div class="rounded-md border p-4 bg-slate-50">
                    <div v-for="kr in okr.keyResults" class="p-2 rounded-md flex items-center space-x-6">
                      <p class="text-base">
                        {{ kr.name }}
                      </p>
                      <span class="padding-3 rounded-full bg-slate-100">{{ kr.resultNumber }}</span>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            <div v-if="today === setting?.updateDay">
              <RouterLink :to="`/progress/${okr.id}`">
                <div class="rounded-md p-6 bg-yellow-100 border border-yellow-400 shadow-sm">
                  <div class="flex items-center space-x-3">
                    <Label>Let's update</Label>
                    <ArrowBigUpDash class="text-yellow-600" />
                    <Button variant="secondary" class="bg-yellow-300 hover:bg-yellow-400 text-yellow-900 font-semibold">
                      <span>Update</span>
                    </Button>
                  </div>
                </div>
              </RouterLink>
            </div>

          </div>
        </div>
      </CardContent>
    </div>
  </Card>
</template>