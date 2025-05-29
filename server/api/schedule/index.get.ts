export default defineEventHandler(async (event) => {
    const hourSettings = await prisma.workSchedule.findMany()

    return hourSettings
})