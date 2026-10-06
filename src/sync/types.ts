export interface NormalizedContest {
  platform: string;
  externalId: string;
  name: string;
  startTime: string; // ISO-8601 UTC string
  durationMinutes: number;
  url: string;
  status: string; // 'BEFORE', 'CODING', 'FINISHED' etc.
}

export interface CodeforcesContestResponse {
  id: number;
  name: string;
  type: string;
  phase: string;
  frozen: boolean;
  durationSeconds: number;
  startTimeSeconds?: number;
  relativeTimeSeconds?: number;
}

export interface CodeforcesApiResponse {
  status: string; // "OK" or "FAILED"
  result?: CodeforcesContestResponse[];
  comment?: string;
}