<script setup lang="ts">
definePageMeta({
    layout: "sidebar-layout"
})

import CalendarView from "./components/CalendarView.vue"
import CreateScheduleDialog from "./components/CreateScheduleDialog.vue"

const select = ref()
const onCreateNewWorkSchedule = () => {

}

const { data, refresh } = await useFetch("/api/schedule", {
    method: "get",
})

const handleSelect = (entry) => {
    console.log("selected", entry)
    select.value = entry
}
</script>

<template>
    <AppPageHeader title="Schedule setting">
        <template #endContent>
            <CreateScheduleDialog @onHoursSettingCreated="refresh" />
        </template>
    </AppPageHeader>

    <div>
        <CalendarView :data="data" @select="handleSelect" class="xl:grid-cols-3" />
    </div>
</template>