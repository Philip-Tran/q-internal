<script setup lang="ts">
definePageMeta({
  layout: "sidebar-layout",
});

import { FetchKeys } from "~/constants/data-key";

const { data: projects } = useNuxtData(FetchKeys.PROJECTS_IN_PROGRESS);

const { data } = useFetch("/api/project", {
  method: "get",
  default() {
    return projects;
  },
});
</script>

<template>
  <div class="space-y-20 container mx-auto">
    <AppPageHeader title="Projects">
      <template #endContent>
        <Button>New Project</Button>
      </template>
    </AppPageHeader>

    <div>
       <div v-for="project in data.data">
        <h1>{{ project.name }}</h1>
       </div>
    </div>
  </div>
</template>
