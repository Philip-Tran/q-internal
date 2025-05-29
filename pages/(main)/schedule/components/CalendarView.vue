<script setup lang="ts">
import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'vue'


interface ScheduleEntry {
    id: number
    validFrom: string
    sunday: number
    monday: number
    tuesday: number
    wednesday: number
    thursday: number
    friday: number
    saturday: number
}

const props = defineProps<{
    data: ScheduleEntry[],
    class: HTMLAttributes['class']
}>()

const emit = defineEmits<{
    (e: 'select', entry: ScheduleEntry): void
}>()

const selectedId = ref<number | null>(null)

const days: (keyof ScheduleEntry)[] = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
]

const abbreviate = (day: string): string => day.slice(0, 3).toUpperCase()

const totalHours = (entry: ScheduleEntry): number =>
    days.reduce((total, day) => total + Number(entry[day] ?? 0), 0)

const badgeColor = (entry: ScheduleEntry): string => {
    const hours = totalHours(entry)
    if (hours < 20) return 'bg-red-500/10 text-red-500'
    if (hours < 32) return 'bg-amber-500/10 text-amber-500'
    if (hours <= 48) return 'bg-green-500/10 text-green-500'
    return 'bg-rose-500/10 text-rose-500'
}

const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })

const selectSchedule = (entry: ScheduleEntry): void => {
    selectedId.value = entry.id
    emit('select', entry)
}
</script>

<template>
    <div :class="cn('grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4', props.class)">
        <div v-for="entry in data" :key="entry.id"
            class="rounded-2xl border p-4 shadow-sm transition cursor-pointer bg-background text-foreground" :class="[
                selectedId === entry.id
                    ? 'border-primary'
                    : 'border-border hover:shadow-md'
            ]" @click="selectSchedule(entry)">
            <div class="flex justify-between items-center mb-2">
                <h3 class="text-sm font-medium">
                    Valid From:
                    <span class="font-semibold">
                        {{ formatDate(entry.validFrom) }}
                    </span>
                </h3>
                <span class="text-xs px-2 py-1 rounded-full font-semibold" :class="badgeColor(entry)">
                    {{ totalHours(entry) }} hrs
                </span>
            </div>

            <div class="grid grid-cols-7 gap-1 text-xs text-center text-muted-foreground">
                <div v-for="day in days" :key="day" class="rounded-md px-1.5 py-1" :class="{
                    'bg-primary/10 text-primary font-semibold': Number(entry[day]) > 0,
                }">
                    {{ abbreviate(day) }}
                    <div class="text-[10px] font-medium">{{ entry[day] }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
