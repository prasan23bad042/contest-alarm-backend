import { syncPlatform } from './platformSyncEngine';

export const syncPlatforms = async (
  platforms: string[]
) => {

  const uniquePlatforms =
    Array.from(
      new Set(
        platforms
          .map((platform) =>
            platform.trim().toLowerCase()
          )
          .filter(Boolean)
      )
    );

  const results = [];

  for (const platform of uniquePlatforms) {

    const result =
      await syncPlatform(platform);

    results.push(result);
  }

  const failed =
    results.filter(
      (result) => !result.success
    );

  return {
    success: failed.length === 0,
    results,
  };
};