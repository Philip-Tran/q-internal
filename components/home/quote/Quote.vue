<script lang="ts" setup>

const props = defineProps({
    content: {
        type: String,
    },
    author: {
        type: String,
    }
})

</script>

<template>
    <div class="w-full justify-center align-middle min-h-20">
        <p class="font-serif italic text-xl">
            {{ props.content }}
        </p>
    </div>
</template>