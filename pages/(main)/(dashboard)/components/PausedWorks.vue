<script setup lang="ts">
import { toast } from 'vue-sonner';
import { FetchKeys } from '~/constants/data-key';
import type { Work } from '~/types/work.type';

const router = useRouter()

const props = defineProps<{
    pausedWorks: Work[]
}>()


const onResumeClick = async (workId: string) => {
    const data = await $fetch("/api/work/un-pause", {
        method: 'POST',
        body: { id: workId }
    })

    await refreshNuxtData(FetchKeys.THE_CURRENT_WORK)
    await refreshNuxtData(FetchKeys.PAUSED_WORKS)

    toast.info("Resume work successfully", {
        action: {
            label: 'Start working now',
            onClick: () => router.push(`/work/${workId}`)
        },
    })
}
</script>

<template>
    <div class="flex flex-col space-y-6">
        <Label>Paused Work</Label>
        <div class="flex flex-col space-y-4">
            <div v-for="(pausedWork, index) in pausedWorks" :key="index"
                class="p-3 rounded-lg bg-amber-300 bg-opacity-30 border flex space-x-4 items-center justify-start">
                <Button variant="secondary" class="rounded-full" size="xs"
                    @click="onResumeClick(pausedWork.id)">Resume</Button>
                <p>{{ pausedWork?.workName }}</p>
            </div>
        </div>
    </div>
</template>