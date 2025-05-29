export const useScheduleStore = defineStore("schedule", () => {
    const setWorkHourDialogState = shallowRef<boolean>()

    const toggleSetHourDialog = () => {
        setWorkHourDialogState.value = !setWorkHourDialogState.value
    }

    return {
        setWorkHourDialogState,
        toggleSetHourDialog
    }
})