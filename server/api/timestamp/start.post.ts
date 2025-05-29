import { utcNow } from "~/server/utils/date";

export default defineEventHandler(async (event) => {
  const { action } = getQuery(event)

  const body = await readBody(event);
  const { workId, type, startedAt } = body;

  if (action === "resume") {
    const work = await prisma.timestamps.update({
      where: {
        workId,
      },
      data: {
        status: 'IS_TRACKING',
        startedAt: startedAt ? startedAt : utcNow(),
        endedAt: null,
        lastPingedAt: utcNow()
      }
    })

    return work
  }

  const existTimeStamp = await prisma.timestamps.findUnique({
    where: {
      workId,
    }
  })

  if (existTimeStamp && existTimeStamp.status === "IS_TRACKING") {
    throw createError({
      statusCode: 404,
      statusMessage: "Cannot start an tracking work",
      message: "Cannot start an tracking work",
      data: { field: "status" }
    })
  }

  if (!existTimeStamp) {
    const timestamp = await prisma.timestamps.create({
      data: {
        workId,
        type: type && type,
        status: 'IS_TRACKING',
        startedAt: startedAt ? startedAt : utcNow(),
        lastPingedAt: utcNow()
      },
    });

    return timestamp;
  } else {
    const updated = await prisma.timestamps.update({
      where: {
        workId,
      },
      data: {
        status: "IS_TRACKING",
        startedAt: startedAt ? startedAt : utcNow(),
        lastPingedAt: utcNow(),
        endedAt: null
      }
    })

    return updated
  }
});
