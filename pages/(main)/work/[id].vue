<script lang="ts" setup>
definePageMeta({
    layout: "plain-layout"
})

import { LampEffect } from '~/components/ui/lamp-effect';
import LogTab from "~/pages/(main)/work/components/LogTab.vue";
import debounce from 'lodash.debounce'
import { CircleCheckBig, Maximize2, Minimize2 } from 'lucide-vue-next';
import { FetchKeys } from '~/constants/data-key';

const route = useRoute();
const isLogTabOpen = ref(false)
const noteContent = ref("")

const { data: CurrentWork, refresh } = await useLazyFetch("/api/work/current", {
    method: "get",
    key: FetchKeys.THE_CURRENT_WORK,
})

const toggleLogTab = () => {
    isLogTabOpen.value = !isLogTabOpen.value
}

watchEffect(() => {
    if (CurrentWork.value?.noteContent) {
        noteContent.value = CurrentWork.value.noteContent
    }
})

const saveStatus = ref<'idle' | 'saving' | 'saved'>('idle')

const autoSave = debounce(async () => {
    if (!CurrentWork.value?.id) return; 
    
    saveStatus.value = 'saving'
    await $fetch(`/api/work/note?workId=${CurrentWork.value.id}`, {
        method: "POST",
        body: { noteContent: noteContent.value }
    })
    saveStatus.value = 'saved'
    setTimeout(() => saveStatus.value = 'idle', 1500)
    console.log('Auto-saved')
}, 2000)

watch(noteContent, () => {
    autoSave()
})

onBeforeRouteLeave(async () => {
    autoSave.cancel()
    
    await refreshNuxtData(FetchKeys.THE_CURRENT_WORK)
})

const isNoteOpen = ref(false)
const toggleNote = () => {
    isNoteOpen.value = !isNoteOpen.value
}
</script>

<template>
    <div class="relative">
        <NuxtLink to="/" :prefetch="false" class="absolute top-0 left-0 rounded-br-full dark:hover:bg-slate-700 h-24 w-24 z-50">
        </NuxtLink>

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

        <!-- Note UI -->
        <div class="absolute z-10 right-8 top-8">
            <div v-if="isNoteOpen" class="drop-shadow-lg shadow-white w-[700px] h-1/2">
                <div class="flex justify-between items-center py-2 px-6 bg-yellow-200 rounded-t-lg">
                    <div class="dark:text-black">{{ CurrentWork?.workName }}</div>
                    <div>
                        <Button size="icon" variant="ghost" @click="toggleNote">
                            <Minimize2 />
                        </Button>
                    </div>
                </div>
                <TiptabEditor v-model="noteContent"
                    class="rounded-none border-white text-white w-full bg-white border-none" editorClass="text-black"
                    :isButtonVisible="true" />
                <div class="py-2 px-6 rounded-b-lg bg-white min-h-[32px]">
                    <div class="text-white flex text-sm w-full items-center justify-end">
                        <span v-if="saveStatus === 'saving'">
                            <CircleCheckBig class="w-3 h-3" color="yellow" />
                        </span>
                        <span v-else-if="saveStatus === 'saved'">
                            <CircleCheckBig class="w-3 h-3" color="green" />
                        </span>
                    </div>
                </div>
            </div>

            <div v-else>
                <Button size="sm" variant="secondary" @click="toggleNote" class="flex items-center space-x-2">
                    <span>Note</span>
                    <Maximize2 class="w-4 h-4" />
                </Button>
            </div>
        </div>
    </div>
</template>