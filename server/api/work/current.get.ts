import { WorkStatus } from "~/types/work.type"

export default defineEventHandler(async (event) => {
  const currentWork = await prisma.work.findFirst({
    where: {
      status: WorkStatus.IN_PROGRESS,
    }
  })
  return currentWork
})
