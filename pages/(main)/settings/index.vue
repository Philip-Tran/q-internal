<script lang="ts" setup>
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
</script>

<template>
  <div>
    <Tabs default-value="setting" class="w-[1200px] mx-auto flex space-x-12 space-y-6">
      <div class="w-[300px]">
        <TabsList class="grid w-full grid-cols-1">
          <TabsTrigger value="setting">
            Setting
          </TabsTrigger>
          <TabsTrigger value="account">
            Account
          </TabsTrigger>
        </TabsList>
      </div>
      <div class="m-0">
        <TabsContent value="setting">
          <span>Setting</span>
          <div>
            <pre>{{ data }}</pre>
            <Input />
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
