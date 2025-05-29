import { z } from 'zod'
import { utcNow } from '~/server/utils/date'

// Validation schema for creating work attached to a specific project
const createWorkForProjectSchema = z.object({
  workName: z.string().min(1, 'Work name is required').max(255, 'Work name too long'),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE', 'PAUSE']).default('IN_PROGRESS'),
  noteContent: z.string().optional()
})

export default defineEventHandler(async (event) => {
  try {
    const projectId = getRouterParam(event, 'id')
    const body = await readBody(event)

    if (!projectId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Project ID is required'
      })
    }

    // Validate request body
    const validatedBody = createWorkForProjectSchema.parse(body)

    // Verify project exists
    const project = await prisma.project.findUnique({
      where: { id: projectId }
    })

    if (!project) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Project not found'
      })
    }

    // Create work attached to the project
    console.log("create a new work", "date: ", utcNow())
    const work = await prisma.work.create({
      data: {
        workName: validatedBody.workName,
        status: validatedBody.status,
        noteContent: validatedBody.noteContent,
        projectId: projectId,
      },
      include: {
        Project: {
          select: {
            id: true,
            name: true,
          }
        },
        worklogs: true,
        Timestamps: true
      }
    })

    return {
      success: true,
      data: work
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Validation Error',
        data: error.errors
      })
    }

    console.error('Error creating work for project:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})