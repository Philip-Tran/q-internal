export interface KeyResult {
    id: string
    name: string
    resultNumber: number
    createdAt: string // ISO date string
    updatedAt: string // ISO date string
    objectiveId: string
  }
  
  export interface ObjectiveWithKeyResults {
    id: string
    name: string
    createdAt: string // ISO date string
    updatedAt: string // ISO date string
    month: number
    year: number
    progressOnTotalKeyResult: number | null
    keyResults: KeyResult[]
  }
  