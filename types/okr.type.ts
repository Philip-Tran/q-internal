export interface KeyResult {
  id: string
  name: string
  resultNumber: number
  resultUpdate: number
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

// export type Reflex = {
//   confidentRate: number[];
//   statusNotes: string;
//   howToOvercomeChallenges: string;
//   noteToMyself: string;
// };


// types.ts or within your <script setup lang="ts">
export interface KeyResult {
  id: string
  name: string
  resultNumber: number
  resultUpdate: number
  objectiveId: string
}

export interface Reflex {
  confidentRate: [number, ...number[]]
  statusNotes: string
  noteToMyself: string
  howToOvercomeChallenges: string
}

export interface Objective {
  id: string
  name: string
  progressOnTotalKeyResult: number | null
  month: number
  year: number
  keyResults: KeyResult[]
  reflexes: Reflex[]
}

