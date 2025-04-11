import { type H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody<{
    id: string
    name: string
    keyResults: {
      id: string
      name: string
      resultNumber: number
      objectiveId?: string
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

  // Process key results - separate existing and new ones
  const existingKeyResults = keyResults.filter(kr => !kr.id.startsWith('temp-'))
  const newKeyResults = keyResults.filter(kr => kr.id.startsWith('temp-'))
  
  // Update existing key results
  const updatedKeyResults = existingKeyResults.length > 0 
    ? await prisma.$transaction(
        existingKeyResults.map((kr) =>
          prisma.keyResult.update({
            where: { id: kr.id },
            data: {
              name: kr.name,
              resultNumber: kr.resultNumber,
            },
          })
        )
      )
    : []

  // Create new key results
  const createdKeyResults = newKeyResults.length > 0
    ? await prisma.$transaction(
        newKeyResults.map((kr) =>
          prisma.keyResult.create({
            data: {
              name: kr.name,
              resultNumber: kr.resultNumber,
              objectiveId: objectiveId,
            },
          })
        )
      )
    : []

  // Combine updated and created key results
  const allKeyResults = [...updatedKeyResults, ...createdKeyResults]

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
      keyResults: allKeyResults,
    },
  }
})