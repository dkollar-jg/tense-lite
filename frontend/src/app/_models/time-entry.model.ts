export interface TimeEntry {
  id: number;
  projectId: number;
  userId: number;
  entryDate: string;
  entryNotes: string;
  hours: number;
  hourlyRate: number;
  entryDollarValue: number;
  enabled: boolean;
}
