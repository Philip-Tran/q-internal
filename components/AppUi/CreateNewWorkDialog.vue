<script lang="ts" setup>
import { Plus } from "lucide-vue-next"
import { addWorkSchema } from "@/schemas/work.schemas"

import { toast } from "vue-sonner"

import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate';

const router = useRouter()
const isOpened = ref(false)
const emit = defineEmits<{
  (e: 'newWorkCreated'): void;
}>();

const { meta, defineField, values, handleSubmit, errors } = useForm({
    validationSchema: toTypedSchema(addWorkSchema)
});

const [workName, workNameAttrs] = defineField('workName');

const onSubmit = handleSubmit(async (values) => {
    console.log(values)
    const { data, status } = await useFetch("/api/work", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: values,
    })

    if (status.value === "success") {
        emit("newWorkCreated")
        toast.info("New work created successfully", {
            description: "Start working now",
            action: {
                label: "Start",
                onClick: () => {
                    router.push(`/work/${data.value?.data.id}`)
                }
            }
        })
        setInterval(() => {
            isOpened.value = false
        }, 2000)
    }
})

</script>

<template>
    <Dialog v-model:open="isOpened">
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
                <div>
                    <Label class="mb-4">Name</Label>
                    <div>
                        <Textarea type="text" placeholder="" v-model="workName" v-bind="workNameAttrs"
                            class="md:min-h-[140px]" />
                    </div>
                    <span class="text-sm my-2">{{ errors.workName }}</span>
                </div>
            </form>

            <DialogFooter>
                <Button type="submit" form="dialogForm">
                    Create and start working
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>