import { defineEventHandler, readBody, createError } from 'h3'
import { getObjectiveProgressOnKeyResult } from '~/server/utils/progress';

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    keyResults: { keyResultId: string; resultUpdate: number }[]
  }>(event)
  const objectiveId = getRouterParam(event, "objectiveId")

  const { keyResults } = body

  // Validate input
  if (!Array.isArray(keyResults) || keyResults.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing or invalid keyResults array',
    })
  }

  // Process each key result update in a transaction
  const updatedKeyResults = await prisma.$transaction(
    keyResults.map(({ keyResultId, resultUpdate }) => {
      if (!keyResultId || resultUpdate === undefined) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Missing required fields in one of the key results',
        })
      }

      return prisma.keyResult.update({
        where: { id: keyResultId },
        data: { resultUpdate },
      })
    })
  )

  const progressNumber = await getObjectiveProgressOnKeyResult(objectiveId as string)

  if(updatedKeyResults) {
    await prisma.objective.update({
      where: {
        id: objectiveId,
      },
      data: {
        progressOnTotalKeyResult: progressNumber,
      }
    })
  }

  return {
    message: 'Key results updated successfully',
    data: updatedKeyResults,
  }
})
