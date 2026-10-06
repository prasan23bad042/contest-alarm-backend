export interface NormalizedContest {
    platform: 'codeforces';
    externalId: string;
    name: string;
    startTime: string;
    durationMinutes: number;
    url: string;
    status: string;
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
    status: string;
    result?: CodeforcesContestResponse[];
    comment?: string;
}
//# sourceMappingURL=types.d.ts.map