import { type NewOKRsType } from "~/schemas/oKRs.schema";

export const useOKRsStore = defineStore("orks", () => {
  const createOKRsState = shallowRef({
    name: "",
    month: getCurrentMonth(),
    year: getCurrentYear(),
    isLoading: false,
    isError: false,
    message: "",
  });

  const updateOKRsState = shallowRef({
    isLoading: false,
    isError: false,
    message: "",
  });

  const createOKRs = async (okrValue: NewOKRsType) => {
    createOKRsState.value.name = okrValue.objective;
    try {
      const { message, data } = await $fetch("/api/okrs", {
        method: "POST",
        body: okrValue,
      });
      createOKRsState.value.message = message;
      return data;
    } catch (error) {
      console.error("Error adding post:", (error as Error).message);
      createOKRsState.value.isError = true;
      createOKRsState.value.message = (error as Error).message;
      return { message: createOKRsState.value.message };
    }
  };

  const updateOKRs = async (okrValue: NewOKRsType, okrId: string) => {
    updateOKRsState.value.isLoading = true;
    console.log(okrId, okrValue);
    try {
      const { message, data } = await $fetch(`/api/okrs/update/${okrId}`, {
        method: "PUT",
        body: { objectiveId: okrId, ...okrValue },
      });
      updateOKRsState.value.isLoading = false;
      updateOKRsState.value.message = message;
      return data;
    } catch (error) {
      console.error("Error updating OKR:", (error as Error).message);
      updateOKRsState.value.isError = true;
      updateOKRsState.value.message = (error as Error).message;
      updateOKRsState.value.isLoading = false;
      return { message: updateOKRsState.value.message };
    }
  };

  return { createOKRsState, createOKRs, updateOKRsState, updateOKRs };
});
