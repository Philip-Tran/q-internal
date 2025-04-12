import { getCurrentMonth, getCurrentYear } from "~/utils/date"

export default defineEventHandler(async (event) => {
  const { objective, keyResults } = await readBody<{
    objective?: string
    keyResults?: { keyResultName: string; keyResultNumber: number }[]
  }>(event)

  if (!objective || !Array.isArray(keyResults) || keyResults.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Objective and at least one Key Result are required.",
    })
  }

  const currentYear = getCurrentYear()
  const currentMonth = getCurrentMonth()

  const existingObjective = await prisma.objective.findFirst({
    where: {
      year: currentYear,
      month: currentMonth,
    },
  })

  if (existingObjective) {
    throw createError({
      statusCode: 400,
      statusMessage: "OKR for this month already exists.",
    })
  }

  const newObjective = await prisma.objective.create({
    data: {
      name: objective,
      year: currentYear,
      month: currentMonth,
    },
  })

  const createdKeyResults = await prisma.$transaction(
    keyResults.map((kr) =>
      prisma.keyResult.create({
        data: {
          name: kr.keyResultName,
          resultNumber: kr.keyResultNumber,
          objectiveId: newObjective.id,
        },
      })
    )
  )

  return {
    message: "New OKRs created successfully",
    data: {
      newObjective,
      keyResults: createdKeyResults,
    },
  }
})
