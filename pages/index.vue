<script lang="ts" setup>
definePageMeta({
  middleware: ["admin"]
})
import { Goal } from "lucide-vue-next";
import { authClient } from "~/lib/auth-client";

const { data: session, isPending } = await authClient.useSession(useFetch);

const { status, data } = await useLazyFetch("/api/okrs/current", {
  method: "GET",
})
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
            <Goal />
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
          <p v-if="status === 'pending'">Is loading</p>          
          <template v-else>
            <CardContent class="p-6 pt-0">
              <div>
                <div v-for="goal in data?.data">
                  <h2>
                    {{ goal.name }}
                  </h2>
                </div>
              </div>
            </CardContent>
          </template>
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