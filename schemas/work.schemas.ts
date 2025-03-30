import * as z from "zod";

const addWorkSchema = z.object({
  workName: z.string().min(2).max(50),
});

export { addWorkSchema };
