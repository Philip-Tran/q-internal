<script lang="ts" setup>
definePageMeta({
  layout: "sidebar-layout"
})

const { data, status } = await useFetch('/api/setting/get', {
  method: "GET"
})

const router = useRouter()
import { toast } from 'vue-sonner';
import { authClient } from '~/server/utils/auth-client';

const handleLogOut = async () => {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        toast.info("Logout successfully")
        router.push("/login");
      },
    },
  })
}

const settings = ref({
  updateDay: "",
  timezone: "",

})
</script>

<template>
  <AppPageHeader title="Settings">
    <template #endContent>
      <Button>Update setting</Button>
    </template>
  </AppPageHeader>

  <div>
    <Tabs default-value="preferences" class="w-[1200px] mx-auto flex space-x-12">
      <div class="w-[250px]">
        <TabsList class="grid w-full grid-cols-1 gap-y-1">
          <TabsTrigger class="flex py-2 text-left justify-start" value="preferences">
            Preferences
          </TabsTrigger>
          <TabsTrigger value="account">
            Account
          </TabsTrigger>
        </TabsList>
      </div>
      <div class="m-0">
        <TabsContent value="preferences" class="flex flex-col space-y-8">
          <div>
            <CardTitle class="mb-2">
              Settings
            </CardTitle>
            <CardDescription>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit
            </CardDescription>
          </div>
          <div class="flex flex-col space-y-4">
            <Label>Update day</Label>
            <Input v-model="settings.updateDay"/>
          </div>
        </TabsContent>
        <TabsContent value="account">
          <span>Account</span>
          <div>
            <AppUiColorToggle />

            <pre>{{ data }}</pre>
            <Input />
            <Button @click="handleLogOut">Logout</Button>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  </div>
</template>
