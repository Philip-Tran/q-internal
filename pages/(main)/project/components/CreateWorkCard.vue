<script setup lang="ts">


</script>

<template>
    <div class="flex items-center p-4 border space-x-20 max-w-[800px] mx-auto rounded dark:bg-background">
        <div class="w-2/3">
            <Input class="border-none text-lg" placeholder="Task name"/>
        </div>
        <div class="max-w-80 w-1/3 flex items-center space-x-4">
            <Label for="framework">Project</Label>
            <Select >
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
</template>