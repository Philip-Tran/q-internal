import { type Work } from '~/types/work.type'
import { WorkStatus } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const body = await readBody<Work>(event)
  const { workName, status = WorkStatus.IN_PROGRESS } = body

  if (!workName) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Work name is required',
    })
  }

  // If attempting to create an IN_PROGRESS work, make sure none already exists
  if (status === WorkStatus.IN_PROGRESS) {
    const existing = await prisma.work.findFirst({
      where: { status: WorkStatus.IN_PROGRESS },
    })

    if (existing) {
      throw createError({
        statusCode: 400,
        statusMessage: "I'm still doing something, remember to focus on one thing at a time",
      })
    }
  }

  // Create new work
  const newWork = await prisma.work.create({
    data: {
      workName,
      status,
    },
  })

  return {
    message:
      status === WorkStatus.IN_PROGRESS
        ? 'New work created successfully'
        : 'New work created',
    data: newWork,
  }
})
