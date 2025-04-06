/**
 * Recalculates the progress on total key results for a specific objective and returns the progress as a percentage.
 * @param objectiveId - The ID of the objective whose key results need to be recalculated.
 * @returns The calculated progress percentage.
 */
export const getObjectiveProgressOnKeyResult = async (objectiveId: string): Promise<number> => {
  const keyResults = await prisma.keyResult.findMany({
    where: { objectiveId },
  })

  // Calculate the total result number and result update values
  let totalResultNumber = 0
  let totalResultUpdate = 0

  keyResults.forEach((kr) => {
    totalResultNumber += kr.resultNumber

    // Only add to totalResultUpdate if resultUpdate is not null
    if (kr.resultUpdate !== null) {
      totalResultUpdate += kr.resultUpdate
    }
  })

  // Calculate progress as a percentage (resultUpdate/resultNumber) * 100
  let progressPercentage = 0
  if (totalResultNumber > 0) {
    progressPercentage = (totalResultUpdate / totalResultNumber) * 100
  }

  return Math.round(progressPercentage) 
}
