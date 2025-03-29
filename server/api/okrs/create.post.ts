import { getCurrentMonth, getCurrentYear } from "~/utils/date";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { objective, keyResults } = body;

  if (!objective || !keyResults) {
    throw createError({
      statusCode: 400,
      statusMessage: "Include all fields please",
    });
  }

  const thisMonthObjective = await prisma.objective.findFirst({
    where: {
      year: getCurrentYear(),
      month: getCurrentMonth(),
    },
  });

  if (thisMonthObjective) {
    throw createError({
      statusCode: 400,
      statusMessage: "I have already set OKR for this month",
    });
  } else {
    const newObjective = await prisma.objective.create({
      data: {
        name: objective,
        month: getCurrentMonth(),
        year: getCurrentYear(),
      },
    });

    if (newObjective) {
      if (Array.isArray(keyResults) && keyResults.length > 0) {
        // Create an array of promises for each key result creation
        const keyResultPromises = keyResults.map(keyResult => 
          prisma.keyResult.create({
            data: {
              name: keyResult.keyResultName, 
              objectiveId: newObjective.id, 
              resultNumber: keyResult.keyResultNumber
            }
          })
        );
        
        // Wait for all key results to be created
        const createdKeyResults = await Promise.all(keyResultPromises);
        
        // Return both the objective and created key results
        return {
          message: "New OKRs created successfully",
          data: {
            newObjective,
            keyResults: createdKeyResults
          }
        };
      } else {
        return { message: "Key Result is missing" };
      }
    }
  }
});