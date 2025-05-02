export const useOKRsGetStore = defineStore("orks-get", () => {
  const okrs = ref();
  const state = ref({
    isLoading: false,
    isError: false,
    isSuccess: false,
  });

  const getOKRs = async () => {
    state.value.isLoading = true;
    try {
      const data = await $fetch("/api/okrs/current");

      if(!data) {
        state.value.isError = true;
      }

      okrs.value = data;
    } catch (error) {
      console.error(error);
    } finally {
        state.value.isLoading = false
    }
  };

  return { okrs, getOKRs, state };
});
