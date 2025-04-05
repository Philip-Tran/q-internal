<script lang="ts" setup>
import { addWorkSchema } from "@/schemas/work.schemas"

import { toast } from "vue-sonner"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate';

const router = useRouter()

const { meta, defineField, values, handleSubmit, errors } = useForm({
    validationSchema: toTypedSchema(addWorkSchema)
});

const [workName, workNameAttrs] = defineField('workName');

const onSubmit = handleSubmit(async (values) => {
    console.log(values)
    const { data, status } = await useFetch("/api/work/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: values,
    })

    if (status.value === "success") {
        toast.info("New work created successfully", {
            description: "Start working now",
            action: {
                label: "Start",
                onClick: () => {
                    router.push(`/work/${data.value?.data.id}`)
                }
            }
        })
    }
})
</script>

<template>
    <Dialog>
        <DialogTrigger as-child>
            <Button variant="outline">
                Create new work
            </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[525px] md:h-[]">
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