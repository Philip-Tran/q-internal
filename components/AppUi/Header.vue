<script lang="ts" setup>
import { Settings } from 'lucide-vue-next';


</script>

<template>
    <div class="border-b sticky top-0 min-h-[16] flex items-center z-50 bg-white">
        <div class="w-full flex items-center justify-between px-6 py-2">
            <div class="min-h-12 flex items-center  space-x-8">
                <RouterLink to="/">
                    <div class="text-xl font-md">
                        Q Internal
                    </div>
                </RouterLink>
                <Separator orientation="vertical" class="w-[2px] h-7" />
                <AppUiMainNav class="mx-6" />
            </div>
            <div class="ml-auto flex items-center space-x-4">
                <Button variant="secondary" size="icon">
                    <Settings class="w-4 h-4 text-slate-800" />
                </Button>
            </div>
        </div>
    </div>
</template>