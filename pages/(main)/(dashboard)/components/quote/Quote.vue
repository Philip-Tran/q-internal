<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils';

const props = defineProps<{
    content?: string
    author?: string
    class?: HTMLAttributes['class']
}>()

</script>

<template>
    <div :class="cn('w-full flex space-y-2 justify-center items-center min-h-20 flex-col', props.class)">
        <p class="font-serif italic text-xl">
            {{ props.content }}
        </p>
        <span>{{ author }}</span>
    </div>
</template>