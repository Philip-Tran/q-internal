export default defineEventHandler(async(event) => {
    const id = getRouterParam(event, "id")

    const project = await prisma.project.findUnique({
        where: {
            id,
        }
    })

    return project
})