<script lang="ts" setup>
import { useMyWorkStore } from "#imports"

import { Plus } from "lucide-vue-next"
import { addWorkSchema } from "@/schemas/work.schemas"
import { toast } from "vue-sonner"
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate';

const workStore = storeToRefs(useMyWorkStore())
const router = useRouter()
const emit = defineEmits<{
  (e: 'newWorkCreated'): void;
}>();

const { meta, defineField, values, handleSubmit, errors } = useForm({
    validationSchema: toTypedSchema(addWorkSchema)
});

const [workName, workNameAttrs] = defineField('workName');

const onSubmit = handleSubmit(async (values) => {
    // console.log(values)
    const data = await $fetch("/api/work", {
        method: "POST",
        body: values,
    })

    if (data) {
        emit("newWorkCreated")
        values.workName = ""
        toast.info("New work created successfully", {
            action: {
                label: "Start working on this task",
                onClick: () => {
                    router.push(`/work/${data.data.id}`)
                }
            }
        })
        setInterval(() => {
            workStore.isNewWorkDialogOpened.value = false
        }, 2000)
    }
})

</script>

<template>
    <Dialog v-model:open="workStore.isNewWorkDialogOpened.value" >
        <DialogTrigger as-child>
            <Button variant="secondary" size="icon">
                <Plus />
            </Button>
        </DialogTrigger>
        <DialogContent  class="sm:max-w-[525px] md:h-[]">
            <DialogHeader>
                <DialogTitle>New Work</DialogTitle>
                <DialogDescription>
                    What do I need to do to get the result
                </DialogDescription>
            </DialogHeader>

            <form id="dialogForm" @submit="onSubmit">
                <div class="space-y-2">
                    <Label class="mb-4">Title</Label>
                    <div>
                    <Textarea type="text" placeholder="" v-model="workName" v-bind="workNameAttrs"
                            class="md:min-h-[140px]" />
                    </div>
                </div>
            </form>

            <DialogFooter>
                <Button type="submit" :disabled="!meta.valid" form="dialogForm">
                    Create and start working
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>