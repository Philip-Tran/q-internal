import { getCurrentMonth, getCurrentYear } from "~/utils/date"

export default defineEventHandler(async (event) => {
  let currentOKR

  const currentObjective = await prisma.objective.findMany({
    where: {
      year: getCurrentYear(),
      month: getCurrentMonth(),
    }
  })
  return currentObjective
})
