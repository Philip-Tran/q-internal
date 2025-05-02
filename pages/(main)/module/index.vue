<script setup lang="ts">
definePageMeta({
    layout: "default"
})

const moduleData = [
    {
        url: "https://youtube.com/feed/subscriptions",
        name: "Youtube",
    },
    {
        url: "https://mail.google.com/mail/u/0/#inbox",
        name: "Gmail",
    },
    {
        url: "https://github.com",
        name: "GitHub",
    },
    {
        url: "https://chat.openai.com",
        name: "ChatGPT",
    },
    {
        url: "https://claude.ai",
        name: "Claude AI",
    },
    {
        url: "https://duckduckgo.com/",
        name: "Duckduckgo",
    },
]
</script>

<template>
    <div class="max-w-[1200px] mx-auto">
        <h1 class="mb-12 text-2xl">Module</h1>
        <div class="grid grid-cols-3 gap-6">
            <Card v-for="module in moduleData">
                <CardHeader>
                    <CardTitle>
                        {{ module.name }}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        <NuxtLink :to="module.url" external target="_blank">
                            {{ module.url }}
                        </NuxtLink>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
</template>