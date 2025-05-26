export default defineEventHandler(async(event) => {
    const body = await readBody(event)

    const project = await prisma.project.create({
        data: {
            name,
        }
    })
    return 
})