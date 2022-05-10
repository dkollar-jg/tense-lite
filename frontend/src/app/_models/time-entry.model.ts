export interface TimeEntry {
  id: number;
  projectId: number;
  userId: number;
  entryDate: Date;
  entryNotes: string;
  hours: number;
  hourlyRate: number;
  entryDollarValue: number;
}
