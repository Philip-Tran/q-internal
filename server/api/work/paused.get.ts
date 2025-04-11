import { H3Event } from 'h3'
import { WorkStatus } from '~/types/work.type'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const pausedWork = await prisma.work.findFirst({
      where: {
        status: WorkStatus.PAUSE,
      },
    })

    if (!pausedWork) {
      setResponseStatus(event, 404)
      return {
        success: false,
        message: 'No paused work found',
      }
    }

    return pausedWork
  
  } catch (error) {
    console.error('Error fetching paused work:', error)
    setResponseStatus(event, 500)
    return {
      success: false,
      message: 'An error occurred while fetching paused work',
    }
  }
})
