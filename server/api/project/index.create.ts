export default defineEventHandler(async (event) => {
    const { name, description, note } = await readBody(event)

    if (!name.trim() || name.trim() === "") {
        return createError({
            statusCode: 400,
            statusMessage: 'Project name is required',
        })
    }

    const project = await prisma.project.create({
        data: {
            name,
            description: description ? description : null,
            note: note ? note : null
        }
    })
    
    return project
})