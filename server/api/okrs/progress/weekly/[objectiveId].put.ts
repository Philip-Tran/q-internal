import { defineEventHandler, readBody, createError } from "h3";
import { getObjectiveProgressOnKeyResult } from "~/server/utils/progress";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<{
      keyResults: { id: string; resultUpdate: number }[];
    }>(event);
    
    const objectiveId = getRouterParam(event, "objectiveId");

    // Validate the input
    if (!Array.isArray(body.keyResults) || body.keyResults.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing or invalid keyResults array",
      });
    }

    // Validate individual key results in the array
    const invalidKeyResult = body.keyResults.find(
      (kr) => !kr.id || kr.resultUpdate === undefined
    );

    if (invalidKeyResult) {
      throw createError({
        statusCode: 400,
        statusMessage: `Missing required fields in key result with ID ${invalidKeyResult.id}`,
      });
    }

    // Process updates in a single transaction
    const updatedKeyResults = await prisma.$transaction(
      body.keyResults.map(({ id, resultUpdate }) =>
        prisma.keyResult.update({
          where: { id },
          data: { resultUpdate },
        })
      )
    );

    // Get updated progress on the objective
    const progressNumber = await getObjectiveProgressOnKeyResult(objectiveId as string);

    // Update the objective's progress
    await prisma.objective.update({
      where: { id: objectiveId },
      data: {
        progressOnTotalKeyResult: progressNumber,
      },
    });

    return {
      message: "Key results updated successfully",
      data: updatedKeyResults,
    };
  } catch (error) {
    // Handle any unexpected errors
    throw createError({
      statusCode: 500,
      statusMessage: (error as Error).message || "Internal Server Error",
    });
  }
});
