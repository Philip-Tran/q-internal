<script setup lang="ts">
import { updateOKRsReflex } from '~/schemas/oKRs.schema';

const emit = defineEmits<{
    (e: 'reflex', payload: typeof values): void;
}>();

const { meta, defineField, values, handleSubmit, errors } = useForm({
    validationSchema: toTypedSchema(updateOKRsReflex)
});

const [confidentRate, confidentRateAttrs] = defineField('confidentRate');
const [statusNotes, statusNotesAttrs] = defineField('statusNotes');
const [howToOvercomeChallenges, howToOvercomeChallengesAttrs] = defineField('howToOvercomeChallenges');
const [noteToMyself, noteToMyselfAttrs] = defineField('noteToMyself');

watch(values, (newValues) => {
    emit('reflex', newValues);
}, { deep: true });

</script>

<template>
    <form>
        <div class="flex flex-col gap-6">
            <div class="my-8 flex flex-col space-y-4">
                <div class="flex justify-between items-center">
                    <Label>How confident I am in completing the goals</Label>
                    <div>{{ confidentRate ? confidentRate[0] : null }}</div>
                </div>
                <div class="flex flex-col gap-2 items-end ">
                    <Slider v-model="confidentRate" :max="100" :step="1" :disable="false" v-bind="confidentRateAttrs" />
                </div>
            </div>

            <Textarea v-model="statusNotes" placeholder="What are the challenges" v-bind="statusNotesAttrs"
                class="h-24" />

            <Textarea v-model="howToOvercomeChallenges"
                placeholder="Which should be done to overcome those challenges to achieve my goals"
                v-bind="howToOvercomeChallengesAttrs" class="h-24" />
            <Textarea v-model="noteToMyself" placeholder="Note to myself" v-bind="noteToMyselfAttrs" class="h-24" />
        </div>
    </form>
</template>
