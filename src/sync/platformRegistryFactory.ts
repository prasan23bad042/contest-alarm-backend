import { CodeforcesAdapter } from './codeforces';
import { CodeChefAdapter } from './codechef';
import { LeetCodeAdapter } from './leetcode';
import { AtCoderAdapter } from './atcoder';
import { PlatformRegistry } from './platformRegistry';

export const createPlatformRegistry =
  (): PlatformRegistry => {

    const registry =
      new PlatformRegistry();

    registry.register(
      new CodeforcesAdapter()
    );

    registry.register(
      new CodeChefAdapter()
    );

    registry.register(
      new LeetCodeAdapter()
    );

    registry.register(
      new AtCoderAdapter()
    );

    return registry;
  };