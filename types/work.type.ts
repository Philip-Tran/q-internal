export enum WorkStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
  PAUSE = "PAUSE",
}

interface Work {
  workName: string;
  status: WorkStatus;
}

export type { Work };
