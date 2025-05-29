<script setup lang="ts">
definePageMeta({
  layout: "default",
})

const okrStore = useOKRsStore()
const { createOKRsState, createOKRs } = okrStore
import { newOKRsSchema } from '~/schemas/oKRs.schema'
import { toTypedSchema } from '@vee-validate/zod'

import { toast } from 'vue-sonner'
import { Check, Circle, Dot, Plus, Trash } from 'lucide-vue-next'

const stepIndex = ref(1)
const steps = [
  { step: 1, title: 'Decide objective', description: 'What I am trying to achieve' },
  { step: 2, title: 'Key results', description: 'What are the key results to achieve the objective' },
  { step: 3, title: 'Option', description: 'Monthly objective or quarter objective' },
]

// Reactive array for key results
const keyResults = ref([{ keyResultName: '', keyResultNumber: '' }])

// Function to add a new key result
const addKeyResult = () => {
  keyResults.value.push({ keyResultName: '', keyResultNumber: '' })
}

// Function to remove a key result
const removeKeyResult = (index: number) => {
  keyResults.value.splice(index, 1)
}

async function onSubmit(values: any) {
  console.log(values)
  const data = await createOKRs(values)
  console.log(data)
  if (createOKRsState.isError) {
    toast.error(createOKRsState.message)
  } else {
    toast.info(createOKRsState.message)
  }
}

</script>

<template>
  <div>
    <div class="w-full items-center">
      <div class="space-y-20 py-12">
        <h2 class="text-center text-2xl font-medium">New OKRs</h2>
        <div class="items-center justify-center">
          <div class="max-w-[650px] mx-auto">
            <Form v-slot="{ meta, values, validate }" as="" keep-values v-auto-animate
              :validation-schema="toTypedSchema(newOKRsSchema[stepIndex - 1])">
              <Stepper v-slot="{ isNextDisabled, isPrevDisabled, nextStep, prevStep }" v-model="stepIndex"
                class="block w-full">
                <form @submit="(e) => {
                  e.preventDefault()
                  validate()
                  if (stepIndex === steps.length && meta.valid) {
                    onSubmit(values)
                  }
                }">
                  <div class="flex w-full flex-start gap-2">
                    <StepperItem v-for="step in steps" :key="step.step" v-slot="{ state }"
                      class="relative flex w-full flex-col items-center justify-center" :step="step.step">
                      <StepperSeparator v-if="step.step !== steps[steps.length - 1].step"
                        class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary" />

                      <StepperTrigger as-child>
                        <Button :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
                          size="icon" class="z-10 rounded-full shrink-0"
                          :class="[state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background']"
                          :disabled="state !== 'completed' && !meta.valid">
                          <Check v-if="state === 'completed'" class="size-5" />
                          <Circle v-if="state === 'active'" />
                          <Dot v-if="state === 'inactive'" />
                        </Button>
                      </StepperTrigger>

                      <div class="mt-5 flex flex-col items-center text-center">
                        <StepperTitle :class="[state === 'active' && 'text-primary']"
                          class="text-sm font-semibold transition lg:text-base">
                          {{ step.title }}
                        </StepperTitle>
                        <StepperDescription :class="[state === 'active' && 'text-primary']"
                          class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm">
                          {{ step.description }}
                        </StepperDescription>
                      </div>
                    </StepperItem>
                  </div>

                  <div class="flex flex-col gap-4 mt-4 min-h-[250px]">
                    <template v-if="stepIndex === 1">
                      <FormField v-slot="{ componentField }" name="objective">
                        <FormItem>
                          <FormLabel>Objective</FormLabel>
                          <FormControl>
                            <Textarea class="min-h-[300px]" v-bind="componentField"
                              placeholder="Develop closer relationship with God" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </FormField>
                    </template>

                    <template v-if="stepIndex === 2" v-auto-animate>
                      <div v-for="(keyResult, index) in keyResults" :key="index" v-auto-animate
                        class="w-full relative flex flex-row space-x-6 items-center">
                        <FormField v-slot="{ componentField }" :name="`keyResults[${index}].keyResultName`">
                          <FormItem class="w-3/4">
                            <FormLabel>Key result</FormLabel>
                            <FormControl>
                              <Input type="text" v-model="keyResults[index].keyResultName" v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </FormField>

                        <FormField v-slot="{ componentField }" :name="`keyResults[${index}].keyResultNumber`">
                          <FormItem class="w-1/4">
                            <FormLabel>Result Number</FormLabel>
                            <FormControl>
                              <Input type="number" v-model="keyResults[index].keyResultNumber"
                                v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </FormField>

                        <Button variant="ghost" size="icon" @click.prevent="removeKeyResult(index)"
                          v-if="keyResults.length > 1" class="absolute -right-4 bottom-0 translate-x-full">
                          <Trash class="size-4" />
                        </Button>
                      </div>

                      <Button variant="outline" class="mt-2" @click.prevent="addKeyResult">
                        <Plus class="size-4 mr-2" /> Add Key Result
                      </Button>
                    </template>

                    <template v-if="stepIndex === 3">
                      <FormField v-slot="{ componentField }" name="timeFrame">
                        <FormItem>
                          <FormLabel>Time frame</FormLabel>
                          <Select v-bind="componentField" v-model="values.timeFrame">
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="thisMonth">This Month</SelectItem>
                                <SelectItem value="quarter">Quarter</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      </FormField>
                    </template>
                  </div>

                  <div class="flex items-center justify-between mt-4">
                    <Button :disabled="isPrevDisabled" variant="outline" size="sm" @click="prevStep()">
                      Back
                    </Button>
                    <div class="flex items-center gap-3">
                      <Button v-if="stepIndex !== 3" :type="meta.valid ? 'button' : 'submit'" :disabled="isNextDisabled"
                        size="sm" @click="meta.valid && nextStep()">
                        Next
                      </Button>
                      <Button v-if="stepIndex === 3" size="sm" type="submit">
                        Submit
                      </Button>
                    </div>
                  </div>
                </form>
              </Stepper>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
