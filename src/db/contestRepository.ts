import prisma from './prisma';
import { NormalizedContest } from '../sync/types';

export const upsertContest = async (contest: NormalizedContest) => {
  return prisma.contest.upsert({
    where: {
      platform_externalId: {
        platform: contest.platform,
        externalId: contest.externalId,
      },
    },
    update: {
      name: contest.name,
      startTime: new Date(contest.startTime),
      durationMinutes: contest.durationMinutes,
      url: contest.url,
      status: contest.status,
      lastSyncedAt: new Date(),
    },
    create: {
      platform: contest.platform,
      externalId: contest.externalId,
      name: contest.name,
      startTime: new Date(contest.startTime),
      durationMinutes: contest.durationMinutes,
      url: contest.url,
      status: contest.status,
    },
  });
};

export const getUpcomingContests = async () => {
  return prisma.contest.findMany({
    where: {
      status: {
        in: ['BEFORE'],
      },
      startTime: {
        gte: new Date(),
      },
    },
    orderBy: {
      startTime: 'asc',
    },
  });
};

export const getContestByExternalId = async (platform: string, externalId: string) => {
  return prisma.contest.findUnique({
    where: {
      platform_externalId: {
        platform,
        externalId,
      },
    },
  });
};
