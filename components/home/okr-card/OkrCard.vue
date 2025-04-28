<script setup lang=ts>
import { ArrowBigUpDash, Crosshair, Pencil } from 'lucide-vue-next';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible';

const props = defineProps({
  currentOKRs: {

  },

})
const monthTimePercentage = getMonthProgressPercentage();
const okrStore = useOKRsGetStore()

okrStore.getOKRs()

const isOpen = ref(false)

</script>

<template>
  <Card class="col-span-4">
    <CardHeader class="border-b h-[68px]">
      <CardTitle>This month goal</CardTitle>
    </CardHeader>
    <p v-if="false">Is loading</p>
    <template v-else>
      <CardContent class="p-6 relative">
        <div class="flex flex-col space-y-8">
          <div v-for="okr in okrStore.state" :key="okr.id" class="flex flex-col space-y-5">
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
                  :value="okr.progressOnTotalKeyResult" :circleStrokeWidth=8 class="w-[60px] h-[60px] text-lg" />
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
              <RouterLink :to="`/progress/${okr.id}`">
                <Button variant="secondary">
                  <span>Update</span>
                  <ArrowBigUpDash />
                </Button>
              </RouterLink>
              <Collapsible v-model:open="isOpen">
                <CollapsibleTrigger>
                  <Button variant="outline">
                    Expand
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div class="rounded-md border p-4 bg-slate-50">
                    <div v-for="kr in okr.keyResults" class="p-2 rounded-md">
                      <p class="text-base">
                        {{ kr.name }}
                      </p>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </div>
      </CardContent>
    </template>
  </Card>
</template>