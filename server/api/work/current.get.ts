import { WorkStatus } from "~/types/work.type"

export default defineEventHandler(async (event) => {
  const currentWork = await prisma.work.findFirst({
    where: {
      status: WorkStatus.IN_PROGRESS,
    }
  })

  if(currentWork) {
    return currentWork
  } else {
    return {
      message: "No work in progress"
    }
  }
})
