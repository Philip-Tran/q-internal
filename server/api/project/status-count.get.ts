import { ProjectStatus } from '@prisma/client'

export default defineEventHandler(async (event) => {
  try {
    const statusCounts = await prisma.project.groupBy({
      by: ['status'],
      _count: {
        id: true
      }
    })

    // Transform to object format
    const counts = statusCounts.reduce((acc, item) => {
      acc[item.status] = item._count.id
      return acc
    }, {} as Record<ProjectStatus, number>)

    // Ensure all statuses are represented
    Object.values(ProjectStatus).forEach(status => {
      if (!counts[status]) {
        counts[status] = 0
      }
    })

    return {
      success: true,
      data: counts,
      total: Object.values(counts).reduce((sum, count) => sum + count, 0)
    }

  } catch (error) {
    console.error('Error fetching status counts:', error)
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch status counts'
    })
  }
})

