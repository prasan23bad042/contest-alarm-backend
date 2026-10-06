import { NormalizedContest } from "./types";

export interface ContestPlatformAdapter {
  readonly platform: string;

  fetchContests(): Promise<NormalizedContest[]>;
}