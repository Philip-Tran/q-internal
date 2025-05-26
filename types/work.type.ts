export type WorkStatus = 'TODO' | 'IN_PROGRESS' | 'DONE' | 'PAUSE'

type Work = {
    id: string
    workName: string
    status: WorkStatus
    createdAt: string
    updatedAt: string
}


export enum LogType {
  PAUSE = "PAUSE",
  UPDATE = "UPDATE",
  FINISH = "FINISH"
}

export type { Work };
