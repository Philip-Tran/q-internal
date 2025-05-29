export function useLocalTime(utcInput: string | Date) {
  const { $dayjs } = useNuxtApp()
  return $dayjs.utc(utcInput).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss')
}


