<script lang="ts" setup>
import AppSideBar from '~/components/AppSidebar.vue';
import { ScrollArea } from '~/components/ui/scroll-area';
import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar';
</script>

<template>
    <div class="dark:bg-[#171717] fixed inset-0 flex overflow-hidden">
        <SidebarProvider>
            <AppSideBar />
            <main class="flex-1 flex flex-col w-full h-full xl:py-3 pb-12 xl:pr-3 overflow-hidden">
                <div
                    class="flex py-1 sm:py-2 px-4 w-full h-10 max-h-12 border-b items-center justify-between lg:hidden">
                    <SidebarTrigger class='-ml-2' />
                </div>
                <div class="flex-1 xl:py-3 xl:rounded-lg dark:bg-black overflow-hidden">
                    <ScrollArea class="h-full overflow-y-auto">
                        <div class="mx-8 xl:mx-8">
                            <slot />
                        </div>
                    </ScrollArea>
                </div>
            </main>
        </SidebarProvider>
    </div>
</template>
