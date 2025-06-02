export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const { include_work } = getQuery(event);

  const project = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      works: include_work == "true" ? 
        {
          include: {
            Timestamps: {
              select: {
                status: true,
                totalDuration: true,
              }
            }
          },
          orderBy: {
            updatedAt: 'desc'
          }
        }
      : false,
    },
  });

  return project;
});
