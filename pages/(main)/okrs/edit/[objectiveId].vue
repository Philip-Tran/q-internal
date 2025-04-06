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

const okrs = ref<ObjectiveWithKeyResults>()

// Fetch the OKR data using the ID from the route parameter
const { data, status } = await useFetch<ObjectiveWithKeyResults>(`/api/okrs/${objectiveId}`, {
  method: "GET",
  key: `fullSingleOKRs-${objectiveId}` 
})

if (data.value) {
  okrs.value = data.value
}

const onSubmit = async () => {
  const {data: EditOKRsResponse, message} = await $fetch(`/api/okrs/update/${objectiveId}`, {
    method: "PUT",
    body: okrs.value
  })

  if(status.value === "success") {
    toast.info(message, {
      description: "Redirecting to dashboard"
    })
    setTimeout(() => {
      router.push("/")
    }, 1200)
  }
}
</script>

<template>
  <div>
    <div class="w-full items-center">
      <div class="space-y-20 py-12">
        <h2 class="text-center text-2xl font-medium">Edit OKRs</h2>
        <div class="items-center justify-center">
          <div class="max-w-[650px] mx-auto">
            <div v-if="!okrs">Loading</div>
            <form v-else @submit.prevent="onSubmit" class="flex flex-col space-y-6">
              <div class="flex flex-col space-y-10">
                <div class="flex flex-col space-y-4">
                  <Textarea v-model="okrs.name" />
                </div>
                <div class="flex flex-col space-y-4">
                  <div class="flex">
                    <div class="w-3/4">
                      <Label>Key result</Label>
                    </div>
                    <div class="w-1/4">
                      <Label>Number</Label>
                    </div>
                  </div>
                  <div class="flex flex-col space-y-8">
                    <div v-for="kr in okrs.keyResults" :key="kr.id" class="flex space-x-4">
                      <div class="w-3/4">
                        <Input v-model="kr.name" />
                      </div>
                      <div class="w-1/4">
                        <NumberField v-model="kr.resultNumber">
                          <NumberFieldContent>
                            <NumberFieldDecrement />
                            <NumberFieldInput />
                            <NumberFieldIncrement />
                          </NumberFieldContent>
                        </NumberField>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Button type="submit">Update</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
