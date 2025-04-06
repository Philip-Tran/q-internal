export default defineEventHandler(async (event) => {
  const objectiveId = getRouterParam(event, "objectiveId")

  if (!objectiveId) {
    return createError({
      statusCode: 400,
      statusMessage: 'Objective ID is required',
    })
  }

  try {
    const objective = await prisma.objective.findUnique({
      where: {
        id: objectiveId,
      },
      include: {
        keyResults: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    })

    if (!objective) {
      return createError({
        statusCode: 404,
        statusMessage: 'Objective not found',
      })
    }

    return objective
  } catch (error) {
    console.error('Error fetching objective:', error)
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
