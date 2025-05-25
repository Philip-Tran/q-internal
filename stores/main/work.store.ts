import { useQuery } from "@pinia/colada"

export const useMyWorkStore = defineStore("work", () => {
  const state = ref({
    work: {
      workName: "",
      status: "",
    },
    isLoading: false,
    isError: false,
    message: "",
  });

  const {
    data,
    error,
    status,
    isLoading,
    refetch,
    refresh,
  } = useQuery({
    key: ['all-current-work'],
    query: () => $fetch("/api/work/current"),
  })

  const createNewWork = async (values: { workName: string }) => {
    try {
      const { data } = await useFetch("");
    } catch (error) { }
  };

  const newWorkDialogState = ref({
    isOpened: false,
  });

  const toggleNewWorkDialog = () => {
    newWorkDialogState.value.isOpened = !newWorkDialogState.value.isOpened
  }

  return { state, createNewWork, newWorkDialogState, toggleNewWorkDialog };
});
