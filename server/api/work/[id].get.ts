import { WorkStatus } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const workId = getRouterParam(event, "id");

    const work = await prisma.work.findFirst({
        where: {
            id: workId,
            status: WorkStatus.IN_PROGRESS,
        }
    })

    if (work) {
        return work
    } else {
        return {
            message: "No work found"
        }
    }
})
