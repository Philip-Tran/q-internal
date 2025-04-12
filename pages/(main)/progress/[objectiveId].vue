<script setup lang="ts">
definePageMeta({
    layout: "default",
})

import type { KeyResult, ObjectiveWithKeyResults } from '~/types/okr.type'
import { } from 'lucide-vue-next'
import { NumberFieldContent, NumberFieldInput } from '~/components/ui/number-field'
import { toast } from 'vue-sonner'

const route = useRoute()
const router = useRouter()

const objectiveId = route.params.objectiveId

const keyResults = ref<KeyResult[]>()

const { data: okrs, status } = await useFetch<ObjectiveWithKeyResults>(`/api/okrs/${objectiveId}`, {
    method: "GET",
    key: `fullSingleOKRs-${objectiveId}`
})

if (status.value === "success") {
    keyResults.value = okrs.value?.keyResults
}

const onSubmit = async () => {
    console.log(keyResults)
    const { data, message } = await $fetch(`/api/okrs/progress/weekly/${objectiveId}`, {
        method: "PUT",
        body: { keyResults: keyResults.value }
    })

    if (data) {
        toast.info(message)
    }

    setTimeout(() => {
        router.push("/")
    }, 1500)
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
                                    <NumberField v-model="kr.resultUpdate" :min="0" :default-value="1" class="w-[120px]">
                                        <NumberFieldContent class="">
                                            <NumberFieldDecrement />
                                            <NumberFieldInput class="" />
                                            <NumberFieldIncrement />
                                        </NumberFieldContent>
                                    </NumberField>
                                </div>
                            </div>
                        </div>

                        <!-- Submit Button -->
                        <div class="flex justify-center">
                            <Button type="submit" class="">Update Key
                                Results</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    </div>
</template>