// Get recently updated projects for quick access
export default defineEventHandler(async (event) => {
  try {
    const { limit = 5 } = getQuery(event)

    const recentProjects = await prisma.project.findMany({
      select: {
        id: true,
        name: true,
        status: true,
        updatedAt: true
      },
      orderBy: {
        updatedAt: 'desc'
      },
      take: parseInt(limit as string)
    })

    return {
      success: true,
      data: recentProjects
    }

  } catch (error) {
    console.error('Error fetching recent projects:', error)
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch recent projects'
    })
  }
})