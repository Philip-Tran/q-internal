import { H3Event } from 'h3'
import { WorkStatus } from "@prisma/client";

export default defineEventHandler(async (event: H3Event) => {
  try {
    const pausedWorks = await prisma.work.findMany({
      where: {
        status: WorkStatus.PAUSE,
      },
    })

    if (pausedWorks[0] == null) {
      setResponseStatus(event, 404)
      return {
        success: false,
        message: 'No paused work found',
      }
    }

    return pausedWorks
  
  } catch (error) {
    console.error('Error fetching paused work:', error)
    setResponseStatus(event, 500)
    return {
      success: false,
      message: 'An error occurred while fetching paused work',
    }
  }
})
