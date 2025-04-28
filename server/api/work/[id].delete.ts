export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  try {
    const deletedWork = await prisma.work.delete({
      where: {
        id,
      },
    });

    return {
      message: "Work deleted successfully",
      data: deletedWork,
    };
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to delete work",
    });
  }
});
