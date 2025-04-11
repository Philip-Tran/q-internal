<script lang="ts" setup>
import { LampEffect } from '~/components/ui/lamp-effect';
import LogTab from "@/components/AppUi/work/LogTab.vue";

definePageMeta({
    layout: "plain-layout"
})

interface Work {
    workName: string,
    status: string,
    id: string
}

const { status, data: CurrentWork } = await useFetch<Work>("/api/work/current", {
    method: "GET",
    lazy: true
})

const isLogTabOpen = ref(false)

const toggleLogTab = () => {
    isLogTabOpen.value = !isLogTabOpen.value
}
</script>

<template>
    <div class="relative">
        <div class="absolute translate-x-1/2 z-10 right-1/2 opacity-0 hover:opacity-100 top-4">
            <Button @click="toggleLogTab">Log work</Button>
        </div>
        <LogTab v-if="isLogTabOpen" :workId="CurrentWork?.id" @close="isLogTabOpen = false"
            class="absolute z-50 right-4 md:right-1/2 translate-x-1/2 -translate-y-1/2 top-1/3 rounded-xl p-3 bg-slate-900 border-none bg-opacity-35" />
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

        <!-- Note -->
        <div class="absolute translate-x-1/2 z-10 right-1 hover:opacity-100 top-4">
            <p>This is it</p>
            <Button>Click me here</Button>
            <TiptabEditor class="border border-white text-white w-[700px] bg-black p-4 rounded-sm"/>
        </div>
    </div>
</template>
