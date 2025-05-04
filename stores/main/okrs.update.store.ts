import type { KeyResult, Reflex } from "~/types/okr.type";

export const useOKRsUpdateStore = defineStore("okrs-update", () => {
  // Use separate reactive refs for better granularity and performance
  const isLoading = ref(false);
  const isError = ref(false);
  const errorMessage = ref<string | null>(null);
  const isSuccess = ref(false);
  
  /**
   * Updates weekly OKR progress
   * @param reflex - The reflex data
   * @param keyResults - Array of key results
   * @param objectiveId - The objective ID
   * @returns Promise resolving to the response data or null on error
   */
  const updateWeeklyAction = async (
    reflex: Reflex,
    keyResults: KeyResult[],
    objectiveId: string
  ) => {
    // Reset state before starting a new request
    isLoading.value = true;
    isError.value = false;
    errorMessage.value = null;
    isSuccess.value = false;
    
    try {
      const { data } = await $fetch(`/api/okrs/progress/weekly/${objectiveId}`, {
        method: "PUT",
        body: { reflex, keyResults },
      });
      
      isSuccess.value = !!data;
      return data;
    } catch (error) {
      isError.value = true;
      errorMessage.value = error instanceof Error 
        ? error.message 
        : 'An unknown error occurred';
      console.error('Failed to update weekly OKR progress:', error);
      return null;
    } finally {
      isLoading.value = false;
    }
  };
  
  /**
   * Reset store state to default values
   */
  const resetState = () => {
    isLoading.value = false;
    isError.value = false;
    errorMessage.value = null;
    isSuccess.value = false;
  };

  return { 
    isLoading,
    isError, 
    errorMessage,
    isSuccess, 
    updateWeeklyAction,
    resetState
  };
});