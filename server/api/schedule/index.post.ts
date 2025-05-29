import { H3Event, sendError } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const body = await readBody(event)

    const {
      sunday,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      validFrom,
    } = body

    const newSchedule = await prisma.workSchedule.create({
      data: {
        sunday: Number(sunday),
        monday: Number(monday),
        tuesday: Number(tuesday),
        wednesday: Number(wednesday),
        thursday: Number(thursday),
        friday: Number(friday),
        saturday: Number(saturday),
        validFrom: validFrom ? new Date(validFrom) : new Date(),
      },
    })

    return newSchedule
  } catch (error: any) {
    console.error('Create WorkSchedule Error:', error)
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Failed to create work schedule' }))
  }
})
