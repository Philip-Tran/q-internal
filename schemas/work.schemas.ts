import { WorkStatus } from "@prisma/client";
import * as z from "zod";

const addWorkSchema = z.object({
  workName: z.string().min(10).max(150),
  status: z.nativeEnum(WorkStatus).default(WorkStatus.IN_PROGRESS),
});

export { addWorkSchema };
