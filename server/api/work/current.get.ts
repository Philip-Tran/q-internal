export default defineEventHandler(async (event) => {
  const currentWork = await prisma.work.findFirst({
    where: {
      status: 'IN_PROGRESS',
    }
  })
  return currentWork
})
