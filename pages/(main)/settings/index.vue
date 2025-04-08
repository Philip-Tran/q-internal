<script lang="ts" setup>
const { data, status } = await useFetch('/api/setting/get',{
    method: "GET"
})
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
            <Input  />
          </div>
        </TabsContent>
      </div>
    </Tabs>
  </div>
</template>
