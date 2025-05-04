import {z} from "zod"

export const newOKRsSchema = [
    z.object({
      objective: z.string().min(10),
    }),
    z.object({
      keyResults: z.array(
        z.object({
          keyResultName: z.string().min(2).max(80),
          keyResultNumber: z.number(),
        })
      ),
    }),
    z.object({
      timeFrame: z.union([z.literal('thisMonth'), z.literal('quarter')]),
    }),
  ]

export const createOKRs = z.object({
  objective: z.string().min(10),
  keyResults: z.array(
    z.object({
      keyResultName: z.string().min(2).max(80),
      keyResultNumber: z.number(),
    })
  ),
  timeFrame: z.union([z.literal("thisMonth"), z.literal("quarter")]),
});

// Export inferred TypeScript type
export type NewOKRsType = z.infer<typeof createOKRs>;

export const updateOKRsReflex = z.object({
  confidentRate: z.array(
    z.number()
      .min(0, { message: 'Confidence rate cannot be less than 0.' })
      .max(100, { message: 'Confidence rate cannot be more than 100.' })
  )
  .nonempty({ message: 'At least one confidence rate is required.' })
  .default([50]),
  statusNotes: z.string().default(""),
  howToOvercomeChallenges: z.string().default(""),
  noteToMyself: z.string().default(""),
});
