<script lang="ts" setup>
import { LampEffect } from '~/components/ui/lamp-effect';

definePageMeta({
    layout: "plain-layout"
})

interface Work {
    workName: String,
    status: String,
    id: String
}

const { status, data: CurrentWork } = await useFetch<Work>("/api/work/current", {
    method: "GET",
    lazy: true
})
</script>

<template>
    <div>
        <LampEffect class="rounded-none">
            <div class="flex flex-col space-y-6">
                <div>
                    <span class="font-heading text-3xl font-serif text-white">{{ CurrentWork?.workName }}</span>
                </div>
            </div>
        </LampEffect>
        <div class="fixed bottom-7 right-1/2 translate-x-1/2">
            <div class="flex flex-row justify-between space-x-6 opacity-0 hover:opacity-100">
                <Button variant="outline" class="" size="xs">Log Work</Button>
                <Button variant="secondary" class="" size="xs">Pause</Button>
                <Button variant="outline" class="" size="xs">Finish</Button>
            </div>
        </div>
    </div>
</template>
