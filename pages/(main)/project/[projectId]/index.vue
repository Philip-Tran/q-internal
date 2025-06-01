<script setup lang="ts">
import WorkCard from './components/WorkCard.vue';

definePageMeta({
  layout: "sidebar-layout",
});

const route = useRoute();
const projectId = computed(() => route.params.projectId);

const {
  data: project,
  refresh,
  status,
} = await useFetch<{
  name: string;
  id: string;
  works: {
    id: string;
    workName: string;
    [key: string]: any;
  }[];
}>(() => `/api/project/${projectId.value}`, {
  watch: [projectId],
  query: {
    include_work: true,
  },
});
</script>

<template>
  <AppPageHeader :title="project?.name">
    <template #endContent>
      <Button>New work for this project</Button>
    </template>
  </AppPageHeader>

  <div class="mx-auto py-20 container-sm">
    <div class="flex flex-col space-y-4">
      <Label class="">Works</Label>
      <div class="flex flex-col space-y-2 h-32 flex-cols">
        <WorkCard
          v-if="Array.isArray(project?.works)"
          v-for="work in project.works"
          :key="work.id"
          class="p-4 border rounded-lg bg-background"
          :data="work"
          v-on:update-work="refresh()"
        >
        </WorkCard>
      </div>
    </div>
  </div>
</template>
