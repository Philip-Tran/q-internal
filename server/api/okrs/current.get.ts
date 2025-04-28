import { getCurrentMonth, getCurrentYear } from "~/utils/date"

export default defineEventHandler(async (event) => {

  const currentObjectives = await prisma.objective.findMany({
    where: {
      year: getCurrentYear(),
      month: getCurrentMonth(),
    },
    select: {
      id: true,
      name: true,
      progressOnTotalKeyResult: true,
      month: true,
      year: true,
      keyResults: true
    }
  })
  return currentObjectives
})
