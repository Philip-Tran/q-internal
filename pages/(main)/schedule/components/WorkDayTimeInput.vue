<script lang="ts" setup>
import {
    NumberField,
    NumberFieldContent,
    NumberFieldDecrement,
    NumberFieldIncrement,
    NumberFieldInput
} from '@/components/ui/number-field'
import { Switch } from '@/components/ui/switch'

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
    workday: string
    modelValue: number
}>()

const hours = ref(props.modelValue ?? 0)
const active = ref(props.modelValue  > 0)

watch(hours, (newVal) => {
    emit('update:modelValue', newVal)
})

watch(active, (newVal) => {
    if (!newVal) {
        hours.value = 0
    }
})
</script>

<template>
    <div class="flex h-10 items-center justify-between space-x-4">
        <p class="text-sm leading-none font-medium">{{ props.workday }}</p>
        <div class="flex items-center gap-4">
            <NumberField
                :format-options="{
                    style: 'decimal',
                    minimumFractionDigits: 0
                }"
                :max="15"
                :min="0"
                :step="0.25"
                class="w-32"
                v-if="active"
                v-model.lazy="hours"
            >
                <NumberFieldContent>
                    <NumberFieldDecrement />
                    <NumberFieldInput />
                    <NumberFieldIncrement />
                </NumberFieldContent>
            </NumberField>
            <Switch v-model="active" />
        </div>
    </div>
</template>