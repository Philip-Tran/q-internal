import { type NewOKRsType } from "~/schemas/oKRs.schema"

export const useOKRsStore = defineStore("orks", () => {
  const createOKRsState = shallowRef({
    name: "",
    month: getCurrentMonth(), 
    year: getCurrentYear(),

    isLoading: false,
    isError: false,
    message: "",
  }) 

  const createOKRs = async (okrValue: NewOKRsType ) => {
    createOKRsState.value.name = okrValue.objective
    try {
      const { message, data } = await $fetch("/api/okrs/create", {
        method: "POST",
        body: okrValue
      })
      createOKRsState.value.message = message
      return data
    } catch (error) {
      console.error("Error adding post:", (error as Error).message);
      createOKRsState.value.isError = true,
      createOKRsState.value.message = (error as Error).message  
      return {message: createOKRsState.value.message};
    }
  }

  return { createOKRsState, createOKRs }
})
