export default defineEventHandler(async (event) => {
  const objectiveId = getRouterParam(event, "objectiveId");

  const keyResults = await prisma.keyResult.findMany({
    where: {
      objectiveId,
    },
  });

  if (!keyResults) {
    throw createError({
      statusCode: 400,
      statusMessage: "Internal server Error",
    });
  }

  return keyResults
});
