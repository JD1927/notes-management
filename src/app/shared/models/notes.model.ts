export enum NoteStatus {
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
}

export interface Note {
  id: string;
  title: string;
  description?: string;
  status: NoteStatus;
}
