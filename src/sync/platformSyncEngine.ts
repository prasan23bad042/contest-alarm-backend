import { createPlatformRegistry } from './platformRegistryFactory';
import { upsertContest } from '../db/contestRepository';
import prisma from '../db/prisma';

export const syncPlatform =
  async (platform: string) => {

    try {

      const registry =
        createPlatformRegistry();

      const adapter =
        registry.get(platform);

      if (!adapter) {

        throw new Error(
          `Platform adapter not registered: ${platform}`
        );
      }

      const contests =
        await adapter.fetchContests();

      let created = 0;
      let updated = 0;
      let unchanged = 0;

      for (const contest of contests) {

        const existing =
          await prisma.contest.findUnique({
            where: {
              platform_externalId: {
                platform:
                  contest.platform,
                externalId:
                  contest.externalId,
              },
            },
          });

        await upsertContest(
          contest
        );

        if (!existing) {

          created++;

          continue;
        }

        const timeChanged =
          existing.startTime.getTime() !==
          new Date(
            contest.startTime
          ).getTime();

        const durationChanged =
          existing.durationMinutes !==
          contest.durationMinutes;

        const statusChanged =
          existing.status !==
          contest.status;

        const nameChanged =
          existing.name !==
          contest.name;

        const urlChanged =
          existing.url !==
          contest.url;

        if (
          timeChanged ||
          durationChanged ||
          statusChanged ||
          nameChanged ||
          urlChanged
        ) {

          updated++;

        } else {

          unchanged++;
        }
      }

      return {
        success: true,
        platform,
        total: contests.length,
        created,
        updated,
        unchanged,
      };

    } catch (error: any) {

      return {
        success: false,
        platform,
        message:
          error.message ||
          `Failed to sync ${platform}`,
      };
    }
  };