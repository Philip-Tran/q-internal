<script setup lang="ts">
definePageMeta({
    layout: "default",
})

import { updateOKRsReflex } from '~/schemas/oKRs.schema'
import type { KeyResult, ObjectiveWithKeyResults, Reflex } from '~/types/okr.type'
import { toast } from 'vue-sonner'
import { Loader2 } from 'lucide-vue-next'
import { Slider } from '@/components/ui/slider'

const route = useRoute()
const router = useRouter()

const updateOKRsStore = useOKRsUpdateStore()
const { isError, isLoading, isSuccess, errorMessage } = storeToRefs(updateOKRsStore)
const objectiveId = route.params.objectiveId as string

const keyResults = ref<KeyResult[] | null>()
const reflexValue = ref<Reflex>()

const { data: keyResultsData, status } = await useFetch<KeyResult[]>(`/api/okrs/keyresults/${objectiveId}`, {
    method: "GET",
    key: `keyResults-of-${objectiveId}`
})

if (status.value === "success") {
    keyResults.value = keyResultsData.value
}

const updateReflex = (raw: any) => {
    const parsed = updateOKRsReflex.parse(raw)
    reflexValue.value = parsed
}

const onSubmit = async () => {
    if (!reflexValue.value || !keyResults.value) {
        toast.error("Please fill out all required fields.")
        return
    }

    await updateOKRsStore.updateWeeklyAction(
        reflexValue.value,
        keyResults.value,
        objectiveId as string
    )
}
</script>

<template>
    <div class="w-full">
        <div class="w-[720px] mx-auto">
            <Card>
                <CardHeader>
                    <h2 class="text-xl font-semibold text-center mb-6">Weekly update</h2>
                </CardHeader>
                <CardContent>
                    <ScrollArea class="p-2 h-[75vh]">
                        <div class="mx-2">
                            <form @submit.prevent="onSubmit" class="space-y-6">
                                <div class="space-y-10 mx-auto">
                                    <div v-for="kr in keyResults" :key="kr.id"
                                        class="grid grid-cols-[1fr_auto_auto] items-center gap-12 mb-4">

                                        <!-- Key Result Name -->
                                        <div>
                                            <h6 class="text-md font-serif">{{ kr.name }}</h6>
                                        </div>

                                        <!-- Result Number Display -->
                                        <div class="text-right">
                                            <span class="text-lg font-medium text-gray-800">{{ kr.resultNumber }}</span>
                                        </div>

                                        <!-- Result Update -->
                                        <div class="">
                                            <NumberField v-model="kr.resultUpdate" :min="0" :default-value="1"
                                                class="w-[120px]">
                                                <NumberFieldContent class="">
                                                    <NumberFieldDecrement />
                                                    <NumberFieldInput class="" />
                                                    <NumberFieldIncrement />
                                                </NumberFieldContent>
                                            </NumberField>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="flex flex-col space-y-6 my-12">
                                    <AppUiUpdateReflexForm v-on:reflex="reflex => updateReflex(reflex)" />
                                </div>

                                <!-- Submit Button -->
                                <div class="flex justify-center">
                                    <Button type="submit" :disabled="!reflexValue || !keyResults || isLoading"
                                        class="">
                                        <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
                                        {{ (isLoading) ? 'Submitting...' : 'Submit' }}
                                    </Button>
                                </div>
                            </form>
                        </div>

                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    </div>
</template>