export default defineEventHandler(async (event) => {
    const objectiveId = getRouterParam(event, "objectiveId");

    if (!objectiveId) {
        throw createError({
            statusCode: 400,
            statusMessage: "Missing objectiveId in route params",
        });
    }

    if (objectiveId) {
        const keyResults = await prisma.keyResult.findMany({
            where: {
                objectiveId,
            }
        })

        const reflex = await prisma.reflex.findFirst({
            where: {
                objectiveId,
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        if (!keyResults && !reflex) {
            throw createError({
                statusCode: 400,
                statusMessage: "No data found",
            });
        }
        return { keyResults: keyResults, relex: reflex }
    }
})