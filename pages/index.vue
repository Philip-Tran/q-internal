<script lang="ts" setup>
definePageMeta({
  middleware: ["admin"]
})
import { authClient } from "~/lib/auth-client";

const { data: session, isPending } = await authClient.useSession(useFetch);
</script>

<template>
  <div>
    <div class="space-y-4">
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card v-for="i in 4">
              <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">
                  Subscriptions
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  class="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div class="text-2xl font-bold">
                  +2350
                </div>
                <p class="text-xs text-muted-foreground">
                  +180.1% from last month
                </p>
              </CardContent>
            </Card>
      </div>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card class="col-span-4">
              <CardHeader>
                <CardTitle>This month goal</CardTitle>
              </CardHeader>
              <CardContent class="p-6 pt-0">
                haha
              </CardContent>
            </Card>
            <Card class="col-span-3">
              <CardHeader>
                <CardTitle>Current work</CardTitle>
                <CardDescription>
                  The current task that I am working on
                </CardDescription>
              </CardHeader>
              <CardContent>
                haha
              </CardContent>
            </Card>
          </div>
    </div>
  </div>
  <div class="bg-green-400">
    <pre>{{ session?.user }}</pre>
  </div>
</template>


<style></style>