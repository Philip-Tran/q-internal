<script setup lang="ts">
import WorkdayTimeInput from './WorkDayTimeInput.vue'

import { CalendarClock, CalendarIcon } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { DateFormatter, getLocalTimeZone, today, type DateValue } from '@internationalized/date'


const emit = defineEmits<{
    (e: "onHoursSettingCreated"): void
}>()
const scheduleStore = useScheduleStore()
const { setWorkHourDialogState } = storeToRefs(scheduleStore)

// Weekdays array
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
type Weekday = Lowercase<typeof weekdays[number]>

// Date handling
const selectedDate = ref<DateValue | undefined>()
const todayDate = today(getLocalTimeZone())
selectedDate.value = todayDate

// Date formatter
const df = new DateFormatter('en-US', {
    dateStyle: 'long'
})

const formatDate = (date: DateValue) => {
    return df.format(date.toDate(getLocalTimeZone()))
}

// Form validation schema with Zod
const schema = z.object({
    monday: z.number().min(0).max(24),
    tuesday: z.number().min(0).max(24),
    wednesday: z.number().min(0).max(24),
    thursday: z.number().min(0).max(24),
    friday: z.number().min(0).max(24),
    saturday: z.number().min(0).max(24),
    sunday: z.number().min(0).max(24),
    validFrom: z.string().optional()
})

// Form setup with vee-validate and Zod
const { handleSubmit, values, errors, setFieldValue, defineField, meta } = useForm({
    validationSchema: toTypedSchema(schema),
    initialValues: {
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0,
        validFrom: todayDate.toString()
    }
})

const [monday, mondayAttrs] = defineField('monday')
const [tuesday, tuesdayAttrs] = defineField('tuesday')
const [wednesday, wednesdayAttrs] = defineField('wednesday')
const [thursday, thursdayAttrs] = defineField('thursday')
const [friday, fridayAttrs] = defineField('friday')
const [saturday, saturdayAttrs] = defineField('saturday')
const [sunday, sundayAttrs] = defineField('sunday')

const weekdayFields: Record<Weekday, {
    model: Ref<number | undefined>
    attrs: Ref<Record<string, any>>
}> = {
    monday: { model: monday, attrs: mondayAttrs },
    tuesday: { model: tuesday, attrs: tuesdayAttrs },
    wednesday: { model: wednesday, attrs: wednesdayAttrs },
    thursday: { model: thursday, attrs: thursdayAttrs },
    friday: { model: friday, attrs: fridayAttrs },
    saturday: { model: saturday, attrs: saturdayAttrs },
    sunday: { model: sunday, attrs: sundayAttrs }
}

// Computed total work hours
const weekWorkTime = computed(() => {
    return (values.monday || 0) +
        (values.tuesday || 0) +
        (values.wednesday || 0) +
        (values.thursday || 0) +
        (values.friday || 0) +
        (values.saturday || 0) +
        (values.sunday || 0)
})

// Watch for date changes and update form
watch(selectedDate, (newDate) => {
    if (newDate) {
        setFieldValue('validFrom', newDate.toString())
    }
})

// Form submission
const onCreate = handleSubmit(async (formData) => {
    try {
        const data = await $fetch("/api/schedule", {
            method: 'POST',
            body: formData
        })

        if (data) {
            emit("onHoursSettingCreated")
            setTimeout(() => {
                scheduleStore.toggleSetHourDialog()
            }, 1000)
        }

        // Handle successful submissions
        console.log('Work schedule created:', data)

    } catch (error: any) {
        console.error('Error submitting form:', error)
    }
})

</script>

<template>
    <Dialog v-model:open="setWorkHourDialogState">
        <DialogTrigger as-child>
            <Button>Create new work schedule</Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[800px]">
            <DialogHeader>
                Schedule
            </DialogHeader>
            <form @submit.prevent="onCreate">
                <div class="xl:py-8">
                    <div class="flex items-center space-x-4 rounded-t-md border border-b-0 p-4">
                        <CalendarClock />
                        <div class="flex-1 space-y-1">
                            <p class="text-sm leading-none font-medium">
                                Weekly Work Hours
                            </p>
                        </div>
                        {{ weekWorkTime }}
                        hours
                    </div>

                    <div class="flex flex-col gap-0 rounded-b-md border p-4">
                        <WorkdayTimeInput workday="Monday" :modelValue="weekdayFields.monday.model.value ?? 0"
                            @update:modelValue="val => weekdayFields.monday.model.value = val" :error="errors.monday" />

                        <WorkdayTimeInput workday="Tuesday" :modelValue="weekdayFields.tuesday.model.value ?? 0"
                            @update:modelValue="val => weekdayFields.tuesday.model.value = val"
                            :error="errors.tuesday" />

                        <WorkdayTimeInput workday="Wednesday" :modelValue="weekdayFields.wednesday.model.value ?? 0"
                            @update:modelValue="val => weekdayFields.wednesday.model.value = val"
                            :error="errors.wednesday" />

                        <WorkdayTimeInput workday="Thursday" :modelValue="weekdayFields.thursday.model.value ?? 0"
                            @update:modelValue="val => weekdayFields.thursday.model.value = val"
                            :error="errors.thursday" />

                        <WorkdayTimeInput workday="Friday" :modelValue="weekdayFields.friday.model.value ?? 0"
                            @update:modelValue="val => weekdayFields.friday.model.value = val" :error="errors.friday" />

                        <WorkdayTimeInput workday="Saturday" :modelValue="weekdayFields.saturday.model.value ?? 0"
                            @update:modelValue="val => weekdayFields.saturday.model.value = val"
                            :error="errors.saturday" />

                        <WorkdayTimeInput workday="Sunday" :modelValue="weekdayFields.sunday.model.value ?? 0"
                            @update:modelValue="val => weekdayFields.sunday.model.value = val" :error="errors.sunday" />
                    </div>

                    <div class="mt-4 flex items-center space-x-6 justify-between">
                        <span>
                            Valid From
                        </span>
                        <Popover>
                            <PopoverTrigger as-child>
                                <Button
                                    :class="cn('w-[280px] justify-start text-left font-normal', !selectedDate && 'text-muted-foreground')"
                                    variant="outline">
                                    <CalendarIcon class="mr-2 h-4 w-4" />
                                    {{ selectedDate ? formatDate(selectedDate) : 'Pick a date' }}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent class="w-auto p-0">
                                <Calendar fixed-weeks v-model="selectedDate" />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <label v-if="errors.validFrom" class="text-destructive text-xs">
                        {{ errors.validFrom }}
                    </label>
                </div>
                <DialogFooter>
                    <Button :disabled="!meta.valid || !meta.dirty" type="submit">Create</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
</template>