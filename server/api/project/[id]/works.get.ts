import { WorkStatus } from "@prisma/client"

// get all work for one specific project
export default defineEventHandler(async (event) => {
    const { status, get_all } = getQuery(event)
    const projectId = await getRouterParam(event, 'id')


    if (status === "in-progress") {
        const works = await prisma.work.findMany({
            where: {
                projectId,
                status: WorkStatus.IN_PROGRESS
            }
        })

        return works
    }

    if (get_all == "true") {
        const works = await prisma.work.findMany({
            where: {
                projectId,
            },
            include: {
                Timestamps: {
                    select: {
                        status: true,
                        totalDuration: true,
                        startedAt: true,
                        endedAt: true,
                    }
                },
                Project: {
                    select: {
                        name: true,
                    }
                }
            }
        })

        return works
    }
})