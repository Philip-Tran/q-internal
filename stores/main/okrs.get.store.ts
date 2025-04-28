export const useOKRsGetStore = defineStore("orks-get", () => {
    const state = ref()

    const getOKRs = async () => {
        try {
            const data = await $fetch("/api/okrs/current")

            state.value = data
        } catch (error) {
            console.error(error)
        }
    }

    return { state, getOKRs}
})