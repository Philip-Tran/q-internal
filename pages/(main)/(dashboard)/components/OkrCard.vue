<script setup lang=ts>
import { ArrowBigUpDash, Crosshair, Pencil } from 'lucide-vue-next';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Quote } from 'lucide-vue-next';

const nuxt = useNuxtApp()
const monthTimePercentage = getMonthProgressPercentage();
const today = getCurrentWeekday()

const { data: setting } = await useFetch("/api/setting", {
  method: "get",
  key: "app-setting"
})

const { data: currentOkrs, refresh, error, status } = await useFetch("/api/okrs/current", {
  key: "current-okrs",
  getCachedData: (key) => {
    if (nuxt.isHydrating && nuxt.payload.data[key]) {
      return nuxt.payload.data[key]
    }

    // Check if the data is already cached in the static data
    if (nuxt.static.data[key]) {
      return nuxt.static.data[key]
    }

    return null
  },
  
  onResponse({ response }) {
  }
})

if (!currentOkrs.value) {
  await refresh()
} else {
  console.log('Using cached data:', currentOkrs.value)
}
</script>

<template>
  <Card class="col-span-4">
    <CardHeader class="border-b h-[68px]">
      <CardTitle>This month goal</CardTitle>
    </CardHeader>
    <div>
      <CardContent class="p-6 relative">
        <div class="flex flex-col space-y-8">
          <div v-if="status == 'pending'">
            <Skeleton class="w-full h-24 rounded-md bg-gray-100" />
          </div>
          <div v-else-if="currentOkrs == null" class="h-full w-full flex">
            <div class="flex flex-col w-full justify-center space-y-4 align-middle">
              <p class="text-destructive">No OKRs set for this month</p>
              <NuxtLink to="/new-okrs">
                <Button class="w-fit">
                  Create
                </Button>
              </NuxtLink>
            </div>
          </div>
          <div v-else v-for="okr in currentOkrs" :key="okr.id" class="flex flex-col space-y-5">
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
            <div class="flex space-x-3">
              <!-- <Collapsible v-model:open="isOpen">
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
              </Collapsible> -->
              <div>
                <Dialog>
                  <DialogTrigger as-child>
                    <Button variant="outline">Latest update</Button>
                  </DialogTrigger>
                  <DialogContent class="sm:max-w-[700px] max-h-[78vh] h-screen">
                    <DialogHeader>
                      <DialogTitle>Edit profile</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <ScrollArea>
                      <div class="grid gap-4 py-4">
                        this
                      </div>
                    </ScrollArea>
                    <DialogFooter>
                      <Button type="submit">
                        Save changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-6">
              <div class="flex flex-col space-y-2">
                <Alert class="" v-for="kr in okr.keyResults" variant="default">
                  <AlertTitle>{{ kr.resultUpdate }} / {{ kr.resultNumber }}</AlertTitle>
                  <AlertDescription>
                    {{ kr.name }}
                  </AlertDescription>
                </Alert>
              </div>
              <div class="flex flex-cols space-y-2">
                <Card v-for="reflex in okr.reflexes" class="h-min p-4">
                  <CardContent class="p-0 space-y-3 gap-2">
                    <Quote />
                    <p class="italic text-lg font-serif">
                      {{ reflex.howToOvercomeChallenges }}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div v-if="setting && setting.updateDay && today === setting?.updateDay">
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