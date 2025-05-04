import { defineEventHandler, readBody, createError } from "h3";
import { getObjectiveProgressOnKeyResult } from "~/server/utils/progress";
import { type Reflex } from "~/types/okr.type";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<{
      keyResults: { id: string; resultUpdate: number }[];
      reflex: Reflex
    }>(event);

    const { confidentRate, howToOvercomeChallenges, noteToMyself, statusNotes } = body.reflex
    const objectiveId = getRouterParam(event, "objectiveId");

    if (!objectiveId) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing objectiveId in route params",
      });
    }

    if(objectiveId) {
      const objective = await prisma.objective.findUnique({
        where: {
          id: objectiveId
        }
      })

      if(!objective) {
        throw createError({
          statusCode: 400,
          statusMessage: "No objective found",
        });
      }
    }

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

    // create new Reflex record
    await prisma.reflex.create({
      data: {
         statusNotes,
         confidentRate: confidentRate[0],
         howToOvercomeChallenges,
         noteToMyself,
         objectiveId,
      }
    })

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
