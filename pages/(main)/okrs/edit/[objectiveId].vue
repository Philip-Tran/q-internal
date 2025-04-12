<script setup lang="ts">
definePageMeta({
  layout: "default",
})

import type { KeyResult, ObjectiveWithKeyResults } from '~/types/okr.type'
import { PlusCircle, Trash } from 'lucide-vue-next'
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

const addNewKeyResult = () => {
  if (!okrs.value) return

  // Create a new key result with default values
  const newKeyResult: KeyResult = {
    id: `temp-${Date.now()}`, // Temporary ID that will be replaced by the backend
    name: "",
    resultNumber: 0,
    resultUpdate: 0,
    objectiveId: objectiveId as string
  }

  // Add the new key result to the existing ones
  okrs.value.keyResults = [...okrs.value.keyResults, newKeyResult]
}

// delete key result
const deletedKeyResultIds = ref<string[]>([])

const deleteKeyResult = (index: number) => {
  if (confirm("Is this really a good move?")) {
    if (!okrs.value) return

    const deleted = okrs.value.keyResults.splice(index, 1)

    // Optional: Track deleted key result IDs to tell backend to remove them
    if (deleted[0] && !deleted[0].id.toString().startsWith("temp-")) {
      deletedKeyResultIds.value.push(deleted[0].id)
    }
  }
}

const onSubmit = async () => {
  const payload = {
    ...okrs.value,
    deletedKeyResultIds: deletedKeyResultIds.value,
  }

  const { data: EditOKRsResponse, message } = await $fetch(`/api/okrs/update/${objectiveId}`, {
    method: "PUT",
    body: payload
  })

  if (status.value === "success") {
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
  <div class="w-full">
    <Card class="max-w-[850px] mx-auto">
      <CardHeader>
        <CardTitle>
          <h2 class="text-center text-2xl font-medium">Edit OKRs</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="w-full items-center">
          <div class="space-y-20 py-12">
            <div class="items-center justify-center">
              <div class="mx-auto">
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
                      <div class="flex flex-col space-y-12">
                        <div v-for="(kr, index) in okrs.keyResults" :key="kr.id" class="flex space-x-8">
                          <div class="w-4/5">
                            <Input v-model="kr.name" />
                          </div>
                          <div class="w-1/5">
                            <NumberField v-model="kr.resultNumber" :min="1">
                              <NumberFieldContent>
                                <NumberFieldDecrement />
                                <NumberFieldInput />
                                <NumberFieldIncrement />
                              </NumberFieldContent>
                            </NumberField>
                          </div>
    
                          <Button type="button" variant="ghost" size="icon" @click="deleteKeyResult(index)">
                            <Trash class="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
    
                      <!-- Add New Key Result Button -->
                      <Button type="button" variant="ghost" class="mt-4 flex items-center justify-center"
                        @click="addNewKeyResult">
                        <PlusCircle class="mr-2 h-4 w-4" />
                        Add New Key Result
                      </Button>
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
      </CardContent>
    </Card>
  </div>
</template>