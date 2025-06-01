export function useLocalTime(utcInput: string | Date) {
  const { $dayjs } = useNuxtApp()
  return $dayjs.utc(utcInput).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss')
}


export function formatSecondsToReadableTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  let result = "";
  if (hours > 0) result += `${hours}h`;
  if (minutes > 0 || hours === 0) result += `${minutes}mins`;

  return result;
}


