import { z } from 'zod'
import { utcNow } from '~/server/utils/date'

const schema = z.object({
  workId: z.string(),
  endedAt: z.date().optional()
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { workId, endedAt } = schema.parse(body)

  // Find the running timer
  const trackingWork = await prisma.timestamps.findUnique({
    where: { workId, status: 'IS_TRACKING' },
  })

  if (!trackingWork) {
    throw createError({ statusCode: 404, statusMessage: 'No tracking timer found' })
  }

  const currentEndedAt = endedAt ?? utcNow()
  const currentStartedAt = trackingWork.startedAt

  // Calculate duration in milliseconds
  const currentDuration = currentEndedAt.getTime() - currentStartedAt.getTime()

  // Accumulate totalDuration in seconds (or ms depending on your preference)
  const previousDuration = trackingWork.totalDuration ?? 0
  const updatedTotalDuration = previousDuration + Math.floor(currentDuration / 1000) // if stored in seconds

  // Append new entry to timestampsRecord
  const existingRecord = trackingWork.timestampsRecord ?? []
  const updatedRecord = Array.isArray(existingRecord)
    ? [...existingRecord, { startedAt: currentStartedAt, endedAt: currentEndedAt }]
    : [{ startedAt: currentStartedAt, endedAt: currentEndedAt }]

  // Update the record
  const updatedTimestamps = await prisma.timestamps.update({
    where: { id: trackingWork.id },
    data: {
      endedAt: currentEndedAt,
      status: "PAUSED",
      lastPingedAt: utcNow(),
      totalDuration: updatedTotalDuration,
      timestampsRecord: updatedRecord
    },
  })

  return updatedTimestamps
})
