export default defineEventHandler(async(event) => {
    const setting = await prisma.setting.findFirst({
        select: {
            updateDay: true
        }
    })

    if(!setting) {
        createError({
            status: 400, 
            statusMessage: "No setting found"
        })
    }
    return setting
})