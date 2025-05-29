<script lang="ts" setup>
import { Settings, Target } from 'lucide-vue-next';
const data = await useNuxtData("currentWork")

</script>

<template>
    <div class="border-b sticky top-0 min-h-[16] flex items-center z-50">
        <div class="w-full flex items-center justify-between px-6 py-2">
            <div class="min-h-12 flex items-center space-x-8">
                <RouterLink to="/">
                    <span class="text-xl font-bold text-gray-700 uppercase dark:text-gray-100">
                        Q Internal
                    </span>
                </RouterLink>
                <Separator orientation="vertical" class="w-[2px] h-7" />
                <AppMainNav class="mx-6" />
            </div>
            <div class="ml-auto flex items-center space-x-4">
                <!-- <NuxtLink :to="`/work/${data.data.value.id}`" class="flex align-middle py-2 content-center px-4 rounded-full bg-yellow-300 bg-opacity-60 space-x-2">
                    <Target class="w-4 h-4"/>
                    <div class="">{{ data.data.value.workName }}</div>
                </NuxtLink> -->
                <Button variant="secondary" size="icon">
                    <Settings class="w-4 h-4 text-slate-800" />
                </Button>
            </div>
        </div>
    </div>
</template>