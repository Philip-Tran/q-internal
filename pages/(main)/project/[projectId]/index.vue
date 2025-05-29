<script setup lang="ts">
const route = useRoute()
const projectId = route.params.projectId
const { data, refresh, status } = await useFetch(`/api/project/${projectId}`)

</script>

<template>
    <pre>
        {{ data }}
    </pre>
</template>