import { type Work, WorkStatus } from "~/types/work.type";

export default defineEventHandler(async (event) => {
  const body = await readBody<Work>(event);

  const { workName, status } = body;

  if(!workName) {
    createError({
        statusCode: 400,
        statusMessage: "Work name is required"
    })
  }

  if(status === WorkStatus.IN_PROGRESS) {
    const currentInProgressWork = await prisma.work.findFirst({
      where: {
        status: WorkStatus.IN_PROGRESS
      }
    })

    if(currentInProgressWork) {
      createError({
        status: 400,
        statusMessage: "I'm still doing something, remember to focus on one thing at a time"
      })
      return {message: "I'm still doing something, remember to focus on one thing at a time", currentWorkInProgress: currentInProgressWork}
    } else {
      const newWork = await prisma.work.create({
        data: {
            workName,
            status: status || WorkStatus.IN_PROGRESS,
        }
      })
  
      if(newWork) {
        return {message: "New work created successfully", data: newWork}
      }
    }
  } else {
    const newWork = await prisma.work.create({
      data: {
        workName,
        status: status
      }
    })

    return {message: "New work created", data: newWork}
  }
});
