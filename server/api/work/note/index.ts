export default defineEventHandler(async (event) => {
  if (event.method === "POST") {
    const query = getQuery(event);
    const workId = query.workId as string;

    if (!workId) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing workId in query",
      });
    }

    const { noteContent } = await readBody(event);

    const work = await prisma.work.update({
      where: { id: workId },
      data: {
        noteContent: noteContent ?? null, 
      },
    });

    return { noteContent: work.noteContent }
  }

  return { message: "Invalid method" }
});
