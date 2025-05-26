export enum WorkStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
  PAUSE = "PAUSE",
}

import * as z from "zod";

const addWorkSchema = z.object({
  workName: z.string().min(10).max(150),
  status: z.nativeEnum(WorkStatus).default(WorkStatus.IN_PROGRESS),
});

const addLogSchema = z.object({
  logContent: z.string().max(300),
})

export { addWorkSchema, addLogSchema };
