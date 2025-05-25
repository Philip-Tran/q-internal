export const useCurrentOkrs = async () => {
  const nuxtData = useNuxtData('current-okr')

  if (!nuxtData.data.value) {
    await useFetch('/api/okrs/current', {
      key: 'current-okr'
    })
  }

  return nuxtData
}
