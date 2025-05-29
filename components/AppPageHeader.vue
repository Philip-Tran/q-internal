<script setup lang="ts">
import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
    class?: HTMLAttributes['class'],
    title: string,
}>()

</script>

<template>
    <div :class="cn('flex w-full items-center justify-between space-x-6 py-2 min-h-[68px] max-h-[80px] rounded-md bg-none xl:mb-6', props.class)">
        <div class="">
            <AppPageTitle :title="title"/>
            <!-- <slot name="page-title"/> -->
        </div>
        <div >
            <slot name="centerContent"/>
        </div>
        <div class="flex items-center justify-end">
            <slot name="endContent"/>
        </div>
    </div>
</template>