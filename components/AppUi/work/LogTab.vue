<script lang="ts" setup>
const props = defineProps({
  workId: String,
  class: {
    type: String,
    default: "",
  },
})

import { cn } from '@/lib/utils';
import {toast} from "vue-sonner"
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate';
import { addLogSchema } from '~/schemas/work.schemas';

const router = useRouter()
const { meta, defineField, values, handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(addLogSchema)
});

const [logContent, logContentAttrs] = defineField('logContent');

const onSubmit = handleSubmit(async (values) => {
  console.log(values)
  const {status, data} = await useFetch("/api/work/log", {
    method: "POST",
    body: {
      workId: props.workId,
      ...values,
    },
  })

  if(status.value === "success") {
    toast.success(`${data.value?.message}`, {
      description: "Redirecting to dashboard"
    })

    setTimeout(() => {
      router.push("/")
    }, 2000)

  }


  console.log(data)
})

</script>

<template>
  <div  :class="
      cn(
        'rounded-sm p-4 border',
        props.class,
      )
    ">
    <Tabs default-value="logUpdate" class="w-[400px]">
      <TabsList class="grid w-full grid-cols-3">
        <TabsTrigger value="logUpdate">
          Update
        </TabsTrigger>
        <TabsTrigger value="logFinish">
          Finish
        </TabsTrigger>
        <TabsTrigger value="logPause">
          Pause
        </TabsTrigger>
      </TabsList>
      <TabsContent value="logUpdate">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-2">
            <div class="space-y-1">
              <Label for="name">Name</Label>
              <Input id="name" default-value="Pedro Duarte" />
            </div>
            <div class="space-y-1">
              <Label for="username">Username</Label>
              <Input id="username" default-value="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="logFinish">
        <Card>
          <CardHeader>
            <CardTitle>Finish work</CardTitle>
            <!-- <CardDescription>
          </CardDescription> -->
          </CardHeader>
          <form id="finishLogForm" @submit.prevent="onSubmit">
            <CardContent class="space-y-2">
              <div class="">
                <Textarea class="h-[120px]" type="text" v-model="logContent" v-bind="logContentAttrs" />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Submit</Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
      <TabsContent value="logPause">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-2">
            <div class="space-y-1">
              <Label for="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div class="space-y-1">
              <Label for="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</template>
