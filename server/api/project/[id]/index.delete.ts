export default defineEventHandler(async(event) => {
    const projectId = getRouterParam(event, "id")

    const project = await prisma.project.delete({
        where: {
            id: projectId
        }
    })

    return {
        success: true,
        message: "Project deleted successfully",
        data: project
    }
})