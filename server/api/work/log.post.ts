export default defineEventHandler(async (event) => {
  const { workId, logContent, logType } = await readBody(event);

  const workExist = await prisma.work.findUnique({
    where: {
      id: workId,
    },
  });

  if (!workExist) {
    createError({
      statusCode: 400,
      statusMessage: "This work does not exist",
    });
    return { message: "This work does not exist" };
  }

  const newLog = await prisma.workLog.create({
    data: {
      workId,
      logContent,
      logType,
    },
  });

  if (newLog && logType === "FINISH") {
    await prisma.work.update({
      where: {
        id: workId,
      },
      data:{
        status: "DONE" 
      }
    });
  }

  if (newLog) {
    return { message: "New log created successfully", data: newLog };
  }
});
