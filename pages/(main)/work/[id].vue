<script lang="ts" setup>
definePageMeta({
    layout: "plain-layout"
})

import { LampEffect } from '~/components/ui/lamp-effect';
import LogTab from "@/components/AppUi/work/LogTab.vue";
import debounce from 'lodash.debounce'
import { CircleCheckBig, Maximize2, Minimize2 } from 'lucide-vue-next';

interface Work {
    workName: string,
    status: string,
    id: string,
    noteContent: string
}

const route = useRoute();
const isLogTabOpen = ref(false)
const noteContent = ref("")


const { status, data:CurrentWork } = await useFetch<Work>("/api/work/current", {
    method: "GET",
})

const toggleLogTab = () => {
    isLogTabOpen.value = !isLogTabOpen.value
}

onBeforeMount(() => {
    if (CurrentWork.value?.noteContent) {
        noteContent.value = CurrentWork.value.noteContent
    }
})

const saveStatus = ref<'idle' | 'saving' | 'saved'>('idle')

const autoSave = debounce(async () => {
    saveStatus.value = 'saving'
    await $fetch(`/api/work/note?workId=${route.params.id}`, {
        method: "POST",
        body: { noteContent: noteContent.value }
    })
    saveStatus.value = 'saved'
    setTimeout(() => saveStatus.value = 'idle', 1500)
    console.log('Auto-saved')
}, 2000) // saves 1 second after last change

watch(noteContent, () => {
    autoSave()
})

// toggle note
const isNoteOpen = ref(false)
const toggleNote = () => {
  isNoteOpen.value = !isNoteOpen.value
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

        <!-- Note UI -->
        <div class="absolute z-10 right-8 top-8">
            <div v-if="isNoteOpen" class="drop-shadow-lg shadow-white w-[700px] h-1/2">
                <div class="flex justify-between items-center py-2 px-6 bg-yellow-200 rounded-t-lg">
                    <div>{{ CurrentWork?.workName }}</div>
                    <div>
                        <Button size="icon" variant="ghost" @click="toggleNote">
                            <Minimize2 />
                        </Button>
                    </div>
                </div>
                <TiptabEditor v-model="noteContent"
                    class="rounded-none border-white text-white w-full bg-white border-none"
                    editorClass="text-black" :isButtonVisible="true" />
                <div class="py-2 px-6 rounded-b-lg bg-white min-h-[32px]">
                    <div class="text-white flex text-sm w-full items-center justify-end">
                        <span v-if="saveStatus === 'saving'"><CircleCheckBig class="w-3 h-3" color="yellow" /></span>
                        <span v-else-if="saveStatus === 'saved'"><CircleCheckBig class="w-3 h-3" color="green" /></span>
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
