import { ContestPlatformAdapter } from "./platformAdapter";

export class PlatformRegistry {
  private readonly adapters = new Map<
    string,
    ContestPlatformAdapter
  >();

  register(
    adapter: ContestPlatformAdapter
  ): void {
    this.adapters.set(
      adapter.platform,
      adapter
    );
  }

  get(
    platform: string
  ): ContestPlatformAdapter | undefined {
    return this.adapters.get(platform);
  }

  getAll(): ContestPlatformAdapter[] {
    return Array.from(
      this.adapters.values()
    );
  }

  has(
    platform: string
  ): boolean {
    return this.adapters.has(platform);
  }
}