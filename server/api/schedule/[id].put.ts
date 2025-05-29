export default defineEventHandler(async (event) => {
  try {
    const id = Number(event.context.params?.id)
    if (isNaN(id)) {
      return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid ID' }))
    }

    const body = await readBody(event)

    // Extract only the allowed fields
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

    const updatedSchedule = await prisma.workSchedule.update({
      where: { id },
      data: {
        sunday,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        validFrom: validFrom ? new Date(validFrom) : undefined,
      },
    })

    return updatedSchedule
  } catch (error: any) {
    console.error('Update WorkSchedule Error:', error)
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Failed to update work schedule' }))
  }
})