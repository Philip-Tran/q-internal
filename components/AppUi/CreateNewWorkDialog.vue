<script lang="ts" setup>
import { addWorkSchema } from "@/schemas/work.schemas"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

import { toTypedSchema } from '@vee-validate/zod'

const formSchema = toTypedSchema(addWorkSchema)

function onSubmit(values: any) {
    console.log(values)
}

</script>

<template>
    <Form v-slot="{ handleSubmit }" as="" keep-values :validation-schema="formSchema">
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

                <form id="dialogForm" @submit="handleSubmit($event, onSubmit)">
                    <FormField v-slot="{ componentField }" name="workName">
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Textarea type="text" placeholder="" v-bind="componentField" class="md:min-h-[140px]" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                </form>

                <DialogFooter>
                    <Button type="submit" form="dialogForm">
                        Create and start working
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </Form>
</template>