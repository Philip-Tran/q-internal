<script setup lang="ts">
definePageMeta({
    layout: "default",
})

import type { KeyResult, ObjectiveWithKeyResults } from '~/types/okr.type'
import { } from 'lucide-vue-next'
import { Textarea } from '~/components/ui/textarea'
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
}

</script>

<template>
    <div class="w-[720px]">
        <form @submit.prevent="onSubmit" class="space-y-6 p-6 bg-white rounded-lg shadow-md">
            <h2 class="text-xl font-semibold text-center mb-6">Weekly update</h2>
            <div class="space-y-5 mx-auto">
                <div v-for="kr in keyResults" :key="kr.id" class="grid grid-cols-3 gap-4 items-center">
                    <!-- Key Result Name -->
                    <div class="col-span-2 row-span-1">
                        <h6>{{ kr.name }}</h6>
                    </div>
    
                    <!-- Result Number Display -->
                    <div class="">
                        <span class="text-lg font-medium text-gray-800">{{ kr.resultNumber }}</span>
                    </div>
    
                    <!-- Result Update -->
                    <div class="">
                        <NumberField v-model="kr.resultUpdate">
                            <NumberFieldContent>
                                <NumberFieldDecrement />
                                <NumberFieldInput class="border border-gray-300 p-2 rounded-lg" />
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
    </div>
</template>