export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { updateDay } = body;

  const setting = await prisma.setting.update({
    where: {
        id: 1
    },
    data: {
        updateDay,
    }
  });
});
