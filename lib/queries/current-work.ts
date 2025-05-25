import { defineQuery, useQuery } from '@pinia/colada'
import { useRoute } from 'vue-router'

// const getCurrentWork = $fetch('/api/work/current')

// export const useCurrentWork = defineQuery(() => {
//   const to = useRoute('/work/[id]')
//   return useQuery({
//     staleTime: 1000 * 60 * 60, // 1 hour
//     key: () => ['current-work', to.params.id],
//     async query() {
//       return getArtwork(to.params.artworkId)
//     },
//   })
// })