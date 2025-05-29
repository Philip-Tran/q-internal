<script setup lang="ts">
import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
    class?: HTMLAttributes['class'],
    title: string,
}>()

</script>

<template>
    <h2 :class="cn('text-2xl font-medium leading-none tracking-tight', props.class)">
        {{ props.title }}
    </h2>
</template>