import { defineStore } from 'pinia'

export const useMyWorkStore = defineStore("work", () => {
  const state = ref({
    work: {
      workName: "",
      status: ""
    },
    isLoading: false,
    isError: false,
    message: ""
  })

  const createNewWork = async (values: {workName: string}) => {
    try {
      const {data} = await useFetch("")
    } catch (error) {
      
    }
  }

  return {state, createNewWork}
})
