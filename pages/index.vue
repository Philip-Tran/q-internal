<script lang="ts" setup>
definePageMeta({
  middleware: ["admin"]
})
import { authClient } from "~/lib/auth-client";

const { data: session, isPending } = await authClient.useSession(useFetch);
</script>

<template>
  <div>
    <div>
      <div class="space-y-6 p-8 dark:bg-black">
        this is home page
      </div>
    </div>
  </div>
  <div class="bg-green-400">
    <pre>{{ session?.user }}</pre>
  </div>
</template>


<style></style>