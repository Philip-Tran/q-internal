import { useQuery } from "@pinia/colada"
import type { Objective } from "~/types/okr.type"

export const useOKRsGetStore = defineStore("okrsGet", () => {
  const {
    data: okrs,
    error,
    status,
    isLoading,
    refetch,
    refresh,
  } = useQuery<Objective[]>({
    staleTime: 1000 * 60 * 60, // 1 hour
    key: ['all-current-objectives'],
    query: () => $fetch("/api/okrs/current"),
  })

  return {
    okrs,
    error,
    status,
    isLoading,
    refetch,
    refresh,
  }
})
