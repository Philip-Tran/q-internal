import { ProjectStatus } from "@prisma/client";

export default defineEventHandler(async (event) => {
  try {
    const { status, scope } = getQuery(event);

    // Validate status parameter if provided
    if (
      status &&
      !Object.values(ProjectStatus).includes(status as ProjectStatus)
    ) {
      throw createError({
        statusCode: 400,
        statusMessage: `Invalid status. Valid statuses are: ${Object.values(
          ProjectStatus
        ).join(", ")}`,
      });
    }

    // Build query conditions
    const whereConditions: any = {};

    if (status) {
      whereConditions.status = status as ProjectStatus;
    }

    // Handle time-based scope filtering
    if (scope) {
      const now = new Date();
      let startDate: Date;

      switch (scope) {
        case "today":
          startDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
          );
          break;
        case "this-week":
          const dayOfWeek = now.getDay();
          const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Monday as start of week
          startDate = new Date(now);
          startDate.setDate(now.getDate() - mondayOffset);
          startDate.setHours(0, 0, 0, 0);
          break;
        case "this-month":
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case "this-year":
          startDate = new Date(now.getFullYear(), 0, 1);
          break;
        case "last-7-days":
          startDate = new Date(now);
          startDate.setDate(now.getDate() - 7);
          break;
        case "last-30-days":
          startDate = new Date(now);
          startDate.setDate(now.getDate() - 30);
          break;
        default:
          throw createError({
            statusCode: 400,
            statusMessage: `Invalid scope. Valid scopes are: today, this-week, this-month, this-year, last-7-days, last-30-days`,
          });
      }

      whereConditions.createdAt = {
        gte: startDate,
      };
    }

    // Fetch projects from database
    const projects = await prisma.project.findMany({
      where: whereConditions,
      orderBy: {
        updatedAt: "desc", // Most recently updated first
      },
    });

    return {
      success: true,
      data: projects,
      count: projects.length,
      filters: {
        status: status || "all",
        scope: scope || "basic",
      },
    };
  } catch (error) {
    console.error("Error fetching projects:", error);

    // Handle known errors
    if ((error as any).statusCode) {
      throw error;
    }

    // Handle unexpected errors
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error while fetching projects",
    });
  }
});
