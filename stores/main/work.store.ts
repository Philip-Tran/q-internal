export const useMyWorkStore = defineStore("work", () => {
  const isNewWorkDialogOpened = ref<boolean>(false)

  const toggleNewWorkDialog = () => {
    isNewWorkDialogOpened.value = !isNewWorkDialogOpened.value
  }

  const openNewWorkDialog = () => {
    isNewWorkDialogOpened.value = true
  }

  const closeNewWorkDialog = () => {
    isNewWorkDialogOpened.value = false
  }
  return { isNewWorkDialogOpened, toggleNewWorkDialog, closeNewWorkDialog, openNewWorkDialog };
});
