import { computed, ComputedRef } from 'vue'
import dayjs, { Dayjs, ManipulateType } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(customParseFormat)

export function useFormattedNow(): { now: ComputedRef<string> } {
  const now = computed(() => dayjs().format('YYYY-MM-DD HH:mm:ss.SSS'))
  return { now }
}

// Extend dayjs with plugins
dayjs.extend(utc)
dayjs.extend(timezone)

/**
 * Get current UTC timestamp for database storage
 * @returns {Date} Current UTC date
 */
export const utcNow = (): Date => {
  return dayjs.utc().toDate()
}

/**
 * Convert any date/time to UTC for database storage
 * @param {string|Date|Dayjs} date - Date to convert
 * @returns {Date} UTC date
 */
export const toUtc = (date: string | Date | Dayjs): Date => {
  return dayjs.utc(date).toDate()
}

/**
 * Convert user's local time to UTC for database storage
 * @param {string|Date} localTime - Local time string or date
 * @param {string} timezone - User's timezone (e.g., 'Asia/Ho_Chi_Minh')
 * @returns {Date} UTC date
 */
export const localToUtc = (localTime: string | Date, timezone: string): Date => {
  return dayjs.tz(localTime, timezone).utc().toDate()
}

/**
 * Get start of day in UTC
 * @param {string|Date|null} date - Optional date, defaults to today
 * @returns {Date} Start of day in UTC
 */
export const startOfDayUtc = (date: string | Date | null = null): Date => {
  return dayjs.utc(date).startOf('day').toDate()
}

/**
 * Get end of day in UTC
 * @param {string|Date|null} date - Optional date, defaults to today
 * @returns {Date} End of day in UTC
 */
export const endOfDayUtc = (date: string | Date | null = null): Date => {
  return dayjs.utc(date).endOf('day').toDate()
}

/**
 * Get start of week in UTC
 * @param {string|Date|null} date - Optional date, defaults to today
 * @returns {Date} Start of week in UTC
 */
export const startOfWeekUtc = (date: string | Date | null = null): Date => {
  return dayjs.utc(date).startOf('week').toDate()
}

/**
 * Get end of week in UTC
 * @param {string|Date|null} date - Optional date, defaults to today
 * @returns {Date} End of week in UTC
 */
export const endOfWeekUtc = (date: string | Date | null = null): Date => {
  return dayjs.utc(date).endOf('week').toDate()
}

/**
 * Get start of month in UTC
 * @param {string|Date|null} date - Optional date, defaults to today
 * @returns {Date} Start of month in UTC
 */
export const startOfMonthUtc = (date: string | Date | null = null): Date => {
  return dayjs.utc(date).startOf('month').toDate()
}

/**
 * Get end of month in UTC
 * @param {string|Date|null} date - Optional date, defaults to today
 * @returns {Date} End of month in UTC
 */
export const endOfMonthUtc = (date: string | Date | null = null): Date => {
  return dayjs.utc(date).endOf('month').toDate()
}

/**
 * Add time to a date and return in UTC
 * @param {string|Date} date - Base date
 * @param {number} amount - Amount to add
 * @param {ManipulateType} unit - Unit (day, hour, minute, etc.)
 * @returns {Date} New date in UTC
 */
export const addTimeUtc = (date: string | Date, amount: number, unit: ManipulateType = 'day'): Date => {
  return dayjs.utc(date).add(amount, unit).toDate()
}

/**
 * Subtract time from a date and return in UTC
 * @param {string|Date} date - Base date
 * @param {number} amount - Amount to subtract
 * @param {ManipulateType} unit - Unit (day, hour, minute, etc.)
 * @returns {Date} New date in UTC
 */
export const subtractTimeUtc = (date: string | Date, amount: number, unit: ManipulateType = 'day'): Date => {
  return dayjs.utc(date).subtract(amount, unit).toDate()
}

/**
 * Check if date is in the past
 * @param {string|Date} date - Date to check
 * @returns {boolean} True if date is in the past
 */
export const isPast = (date: string | Date): boolean => {
  return dayjs.utc(date).isBefore(dayjs.utc())
}

/**
 * Check if date is in the future
 * @param {string|Date} date - Date to check
 * @returns {boolean} True if date is in the future
 */
export const isFuture = (date: string | Date): boolean => {
  return dayjs.utc(date).isAfter(dayjs.utc())
}

/**
 * Get difference between two dates
 * @param {string|Date} date1 - First date
 * @param {string|Date} date2 - Second date
 * @param {ManipulateType} unit - Unit to return difference in
 * @returns {number} Difference
 */
export const diffUtc = (date1: string | Date, date2: string | Date, unit: ManipulateType = 'day'): number => {
  return dayjs.utc(date1).diff(dayjs.utc(date2), unit)
}

/**
 * Format UTC date for logging/debugging
 * @param {string|Date|null} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatUtcForLog = (date: string | Date | null = null): string => {
  return dayjs.utc(date).format('YYYY-MM-DD HH:mm:ss UTC')
}

/**
 * Create date range queries for Prisma
 * @param {string} period - 'today', 'week', 'month', 'year'
 * @param {string|Date|null} baseDate - Optional base date
 * @returns {Object} Prisma date range query object
 */
export const createDateRangeQuery = (
  period: 'today' | 'week' | 'month' | 'year' = 'today',
  baseDate: string | Date | null = null
): { gte: Date; lte: Date } => {
  const base = dayjs.utc(baseDate)

  switch (period) {
    case 'today':
      return {
        gte: base.startOf('day').toDate(),
        lte: base.endOf('day').toDate()
      }
    case 'week':
      return {
        gte: base.startOf('week').toDate(),
        lte: base.endOf('week').toDate()
      }
    case 'month':
      return {
        gte: base.startOf('month').toDate(),
        lte: base.endOf('month').toDate()
      }
    case 'year':
      return {
        gte: base.startOf('year').toDate(),
        lte: base.endOf('year').toDate()
      }
    default:
      throw new Error(`Unsupported period: ${period}`)
  }
}

/**
 * Parse various date formats and return UTC Date
 * @param {string|Date|number} input - Date input
 * @returns {Date|null} UTC Date or null if invalid
 */
export const parseToUtc = (input: string | Date | number): Date | null => {
  const parsed = dayjs.utc(input)
  return parsed.isValid() ? parsed.toDate() : null
}
