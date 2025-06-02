<script setup lang="ts">
import WorkCard from "./components/WorkCard.vue";
import CreateWorkDialog from "./components/CreateWorkDialog.vue";
import { EllipsisVertical } from "lucide-vue-next";
import { FetchKeys } from "~/constants/data-key";

definePageMeta({
  layout: "sidebar-layout",
});

const workStore = useMyWorkStore();
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

// Computed property to sort works - by updatedAt first, with tracking items getting slight boost
const sortedWorks = computed(() => {
  if (!project.value?.works || !Array.isArray(project.value.works)) {
    return [];
  }

  return [...project.value.works].sort((a, b) => {
    const aUpdated = new Date(a.updatedAt || 0).getTime();
    const bUpdated = new Date(b.updatedAt || 0).getTime();

    // If one is tracking and the other isn't, and they have similar update times,
    // prioritize the tracking one slightly
    const timeDiff = Math.abs(aUpdated - bUpdated);
    if (timeDiff < 60000) {
      // Within 1 minute
      if (
        a.Timestamps?.status === "IS_TRACKING" &&
        b.Timestamps?.status !== "IS_TRACKING"
      ) {
        return -1;
      }
      if (
        b.Timestamps?.status === "IS_TRACKING" &&
        a.Timestamps?.status !== "IS_TRACKING"
      ) {
        return 1;
      }
    }

    // Primary sort: by updatedAt (most recently updated first)
    return bUpdated - aUpdated;
  });
});

const onDeleteProject = async () => {
  const data = await $fetch(`/api/project/${projectId.value}`, {
    method: "delete",
  })

  if(data.success === true) {
    refreshNuxtData(FetchKeys.PROJECTS_IN_PROGRESS)
  }
}
</script>

<template>
  <AppPageHeader :title="project?.name">
    <template #endContent>
      <div class="flex space-x-4 items-center">
        <Popover>
          <PopoverTrigger as-child>
            <div
              class="flex items-center dark:hover:bg-gray-800 p-2 cursor-pointer rounded-full justify-center"
            >
              <EllipsisVertical />
            </div>
          </PopoverTrigger>
          <PopoverContent position-strategy="absolute" class="">
            <div class="grid gap-4">
              <Button @click="onDeleteProject" variant="destructive" size="xs">Delete This Project</Button>
            </div>
          </PopoverContent>
        </Popover>
        <CreateWorkDialog
          :project-id="project?.id"
          :project-name="project?.name"
          v-on:new-work-created="refresh()"
        />
      </div>
    </template>
  </AppPageHeader>

  <div class="mx-auto py-20 container-sm">
    <div v-if="project?.works[0]">
      <div class="flex flex-col space-y-4">
        <Label class="">Works</Label>

        <div class="flex flex-col space-y-3">
          <TransitionGroup
            name="work-card"
            tag="div"
            class="flex flex-col space-y-3"
          >
            <WorkCard
              v-for="work in sortedWorks"
              :key="work.id"
              :data="work"
              @update-work="refresh()"
            />
          </TransitionGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Smooth transitions for reordering */
.work-card-move,
.work-card-enter-active,
.work-card-leave-active {
  transition: all 0.3s ease;
}

.work-card-enter-from,
.work-card-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.work-card-leave-active {
  position: absolute;
  right: 0;
  left: 0;
}
</style>
