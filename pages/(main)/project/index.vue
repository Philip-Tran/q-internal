<script setup lang="ts">
import ProjectTitle from "./components/ProjectTitle.vue"
import CreateWorkCard from "./components/CreateWorkCard.vue"
import { Play, Square } from "lucide-vue-next"
import { useNow } from "@vueuse/core"

const name = ref("")

const addProject = async () => {
    try {
        const data = await $fetch("/api/project", {
            method: "post",
            body: { name: name.value }
        })
    } catch {
        
    }
}

const projectId = ref("EWDtbQ")
const workName = ref("")


const { data: works, error, status, execute, refresh } = await useLazyFetch(`/api/project/${projectId.value}/works`, {
    query: { status: '', get_all: "true" }
})

const addWork = async () => {
    try {
        const data = await $fetch(`/api/project/${projectId.value}/work`, {
            method: "post",
            body: { workName: workName.value }
        })

        refresh()
    } catch {

    }
}

const trackingStates = ref({}) // Object to store tracking state for each work

const onWatchPlay = async (workId: string) => {
    const data = await $fetch("/api/timestamp/start", {
        method: "POST",
        body: { workId },
    })

    if (data?.status === "IS_TRACKING") { // Note: use === instead of =
        trackingStates.value[workId] = true
    }
}

const onWatchPause = async (workId: string) => {
        const data = await $fetch("/api/timestamp/stop-watch", {
        method: "PUT",
        body: { workId }
    })
}

// Helper function to check if a specific work is being tracked
const isWorkTracking = (workId: string) => {
    return trackingStates.value[workId] || false
}
</script>

<template>
    <div class="py-40 space-y-20 container mx-auto">
        <ProjectTitle name="Test create timestamp"></ProjectTitle>
        <div class="flex flex-col space-y-4">
            <div v-for="work in works" class="flex p-4 w-[600px] border rounded-e">
                <div>{{ work.workName }} - status: {{ work.status }}</div>
                <button @click="onWatchPlay(work.id)" class="rounded-full border p-6">
                    <Play v-if="!isWorkTracking(work.id)" />
                    <Square v-else />
                </button>
                <div v-if="work.Timestamps">
                    {{ work.Timestamps.status }}
                </div>
                <div>
                    {{useLocalTime(work.createdAt) }}
                </div>


                <Button @click="onWatchPause(work.id)">on pause</Button>
            </div>
        </div>

        <ProjectTitle name="Project name" class="w-fit" />
        <pre>{{ works }}</pre>
        <Button @click="execute">Get work</Button>

        <!-- <CreateWorkCard/> -->
        <div class="flex items-center p-4 border space-x-20 max-w-[800px] mx-auto rounded dark:bg-background">
            <Button @click="addWork">Add work</Button>
            <div class="w-2/3">
                <Input v-model="workName" class="border-none text-lg" placeholder="Task name" />
            </div>
            <div class="max-w-80 w-1/3 flex items-center space-x-4">
                <Label for="framework">Project</Label>
                <Select>
                    <SelectTrigger id="framework">
                        <SelectValue placeholder="Project" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="nuxt">
                            Project 1
                        </SelectItem>
                        <SelectItem value="next">
                            Next.js
                        </SelectItem>
                        <SelectItem value="sveltekit">
                            SvelteKit
                        </SelectItem>
                        <SelectItem value="astro">
                            Astro
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
        <div>
            <form @submit.prevent="addProject">
                <Input v-model="name" />
                <Button type="submit">Submit</Button>
            </form>
        </div>
        <Separator />
    </div>
</template>