import { H3Event } from "h3";
import { WorkStatus } from "~/types/work.type";

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody(event);

  const { id } = body;
  try {
    const work = await prisma.work.update({
      where: {
        id,
      },
      data: {
        status: WorkStatus.IN_PROGRESS
      }
    });

    if (!work) {
      setResponseStatus(event, 404);
      return {
        success: false,
      };
    }

    return work;
  } catch (error) {
    console.error("Error fetching paused work:", error);
    setResponseStatus(event, 500);
    return {
      success: false,
      message: "An error occurred while fetching paused work",
    };
  }
});
