import { z } from 'zod'

const dayEnum = z.enum([
  'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday',
])

const timeBlockSchema = z.object({
  day: dayEnum,
  startTime: z.string().regex(/^\d{2}:\d{2}$/, 'startTime must be in HH:MM format'),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, 'endTime must be in HH:MM format'),
}).refine(data => data.startTime < data.endTime, {
  message: 'startTime must be earlier than endTime',
})

const scheduleSchema = z.object({
  validFrom: z.string().datetime().optional(),
  blocks: z.array(timeBlockSchema),
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // Validate
    const parsed = scheduleSchema.parse(body)

    // Optional: prevent overlapping blocks per day
    const overlaps = parsed.blocks.some((block, i, arr) => {
      return arr.some((other, j) => {
        return (
          i !== j &&
          block.day === other.day &&
          block.startTime < other.endTime &&
          block.endTime > other.startTime
        )
      })
    })

    if (overlaps) {
      throw createError({ statusCode: 400, statusMessage: 'Time blocks overlap on the same day' })
    }

    // Create schedule
    const newSchedule = await prisma.workSchedule.create({
      data: {
        validFrom: parsed.validFrom ? new Date(parsed.validFrom) : new Date(),
        timeBlocks: {
          create: parsed.blocks,
        },
      },
      include: {
        timeBlocks: true,
      },
    })

    return newSchedule
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return sendError(event, createError({ statusCode: 400, statusMessage: err.errors[0].message }))
    }

    console.error('Schedule creation error:', err)
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Failed to create schedule' }))
  }
})

