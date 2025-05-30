<script lang="ts" setup>
const props = defineProps({
  workId: String,
  class: {
    type: String,
    default: "",
  },
})

import { LogType } from '~/types/work.type';

import { cn } from '@/lib/utils';
import { toast } from "vue-sonner"
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate';
import { addLogSchema } from '~/schemas/work.schemas';
import { FetchKeys } from '~/constants/data-key';

const router = useRouter()
const currentTab = ref('logUpdate')
const emit = defineEmits(['close'])

const { meta, defineField, values, handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(addLogSchema)
});

const [logContent, logContentAttrs] = defineField('logContent');

const onSubmit = handleSubmit(async (values) => {
  let logType: string;

  if (currentTab.value === 'logFinish') {
    logType = LogType.FINISH;
  } else if (currentTab.value === 'logPause') {
    logType = LogType.PAUSE;
  } else {
    logType = LogType.UPDATE;
  }

  const data = await $fetch("/api/work/log", {
    method: "POST",
    body: {
      workId: props.workId,
      logType,
      ...values,
    },
    server: false,
    lazy: true
  })

  if (data) {
    toast.success(`${data?.message}`, {
      description: logType == LogType.UPDATE ? "Update successfully" : "Redirecting to dashboard"
    })

    setTimeout(() => {
      emit('close')
    }, 500)

    if (logType !== LogType.UPDATE) {
      setTimeout(() => {
        router.push("/")
      }, 2000)
    }
    
    if (logType === LogType.PAUSE) {
      await refreshNuxtData(FetchKeys.PAUSED_WORKS)
    }
  }
})
</script>

<template>
  <div :class="cn(
    'rounded-sm p-4 border',
    props.class,
  )
    ">
    <Tabs default-value="logUpdate" v-model="currentTab" class="w-[400px]">
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
            <CardTitle>Update</CardTitle>
            <CardDescription>
              Which progress did I made on this task
            </CardDescription>
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
      <TabsContent value="logFinish">
        <Card>
          <CardHeader>
            <CardTitle>Finish work</CardTitle>
            <CardDescription>
              What do I think of the all process
            </CardDescription>
          </CardHeader>
          <form id="finishLogForm" @submit.prevent="onSubmit">
            <CardContent class="space-y-2">
              <div class="">
                <Textarea class="h-[120px]" type="text" v-model="logContent" v-bind="logContentAttrs" />
              </div>
            </CardContent>
            <CardFooter class="">
              <Button type="submit">Finish</Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
      <TabsContent value="logPause">
        <Card>
          <CardHeader>
            <CardTitle>Pause</CardTitle>
            <CardDescription>
              Why do I want to pause this task
            </CardDescription>
          </CardHeader>
          <form id="finishLogForm" @submit.prevent="onSubmit">
            <CardContent class="space-y-2">
              <div class="">
                <Textarea class="h-[120px]" type="text" v-model="logContent" v-bind="logContentAttrs" />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Pause</Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</template>
