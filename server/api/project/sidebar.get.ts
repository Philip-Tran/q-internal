import { ProjectStatus } from '@prisma/client'

export default defineEventHandler(async (event) => {
  try {
    const { status = 'IN_PROGRESS' } = getQuery(event)
    
    // Validate status
    if (!Object.values(ProjectStatus).includes(status as ProjectStatus)) {
      throw createError({
        statusCode: 400,
        statusMessage: `Invalid status: ${status}`
      })
    }

    // Fetch minimal project data for sidebar
    const projects = await prisma.project.findMany({
      where: {
        status: status as ProjectStatus
      },
      select: {
        id: true,
        name: true,
        updatedAt: true,
        // Include work count for additional context
        _count: {
          select: {
            works: true
          }
        }
      },
      orderBy: [
        { updatedAt: 'desc' },
        { name: 'asc' }
      ],
      take: 50 // Limit for performance
    })

    return {
      success: true,
      data: projects,
      count: projects.length,
      status: status
    }

  } catch (error) {
    console.error('Error fetching sidebar projects:', error)
    
    if ((error as any).statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch projects'
    })
  }
})
