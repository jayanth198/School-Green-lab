
export enum AppView {
  HOME = 'HOME',
  OBSERVATION_FORM = 'OBSERVATION_FORM',
  TEACHER_DASHBOARD = 'TEACHER_DASHBOARD',
  PARENT_VIEW = 'PARENT_VIEW',
  HELP = 'HELP'
}

export enum FormType {
  SEE = 'SEE', // ఈరోజు చూశాను
  CHANGE = 'CHANGE', // ఏం మారింది?
  THOUGHT = 'THOUGHT' // నాకు అనిపించింది
}

export interface Observation {
  id: string;
  date: string;
  class: string;
  studentName: string;
  photoUrl: string;
  description: string;
  changeObserved: string;
  reasoning: string;
  type: FormType;
}

export interface SyncStatus {
  pending: number;
  lastSynced: string | null;
}
