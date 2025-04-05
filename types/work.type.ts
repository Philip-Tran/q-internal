
export enum WorkStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
  PAUSE = "PAUSE",
}


type Work = {
    id: string
    workName: string
    status: WorkStatus
    createdAt: Date
    updatedAt: Date
}


export enum LogType {
  PAUSE = "PAUSE",
  UPDATE = "UPDATE",
  FINISH = "FINISH"
}

export type { Work };
