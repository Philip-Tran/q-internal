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
