import { computed } from "vue";
import { useNow } from "@vueuse/core";

export function getCurrentMonth(): number {
  return new Date().getMonth() + 1;
}

export function getCurrentYear(): number {
  return new Date().getFullYear();
}

export const getMonthProgressPercentage = () => {
  const now = useNow({ interval: 1000 * 60 * 60 }); // Update every hour

  return computed(() => {
    const date = now.value;
    const totalDays = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    const currentDay = date.getDate();
    return Math.round((currentDay / totalDays) * 100);
  });
};

export enum WeekDay {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY
}

export function getCurrentWeekday(): keyof typeof WeekDay {
  const dayIndex = new Date().getDay() // 0 (Sun) to 6 (Sat)
  return WeekDay[dayIndex] as keyof typeof WeekDay
}

