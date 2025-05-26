<script setup lang="ts">
    defineProps<{
        name: string
    }>()
</script>

<template>
    <p class="text-2xl dark:text-gray-50 font-medium">{{ name }}</p>
</template>