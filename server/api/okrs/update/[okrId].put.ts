import { type H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody<{
    id: string
    name: string
    keyResults: {
      id: string
      name: string
      resultNumber: number
    }[]
  }>(event)

  const { id: objectiveId, name: objectiveName, keyResults } = body

  // Validate input
  if (!objectiveId || !objectiveName || !Array.isArray(keyResults)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields: id (objectiveId), name, or keyResults',
    })
  }

  // Check if the objective exists
  const existingObjective = await prisma.objective.findUnique({
    where: { id: objectiveId },
  })

  if (!existingObjective) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Objective not found',
    })
  }

  // Update the objective name
  const updatedObjective = await prisma.objective.update({
    where: { id: objectiveId },
    data: { name: objectiveName },
  })

  // Update key results
  const updatedKeyResults = await prisma.$transaction(
    keyResults.map((kr) =>
      prisma.keyResult.update({
        where: { id: kr.id },
        data: {
          name: kr.name,
          resultNumber: kr.resultNumber,
        },
      })
    )
  )

  const progressNumber = await getObjectiveProgressOnKeyResult(objectiveId)

  await prisma.objective.update({
    where: {
      id: objectiveId,
    },
    data: {
      progressOnTotalKeyResult: progressNumber
    }
  })

  return {
    message: 'Objective and key results updated successfully',
    data: {
      objective: updatedObjective,
      keyResults: updatedKeyResults,
    },
  }
})
