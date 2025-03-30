export default defineEventHandler(async (event) => {
  const { workId, logContent } = await readBody(event);

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
    },
  });

  if (newLog) {
    return { message: "New log created successfully", data: newLog };
  }
});
