import * as cheerio from "cheerio";
import { ContestPlatformAdapter } from "./platformAdapter";
import { NormalizedContest } from "./types";

export class AtCoderAdapter
  implements ContestPlatformAdapter {

  readonly platform = "atcoder";

  private readonly endpoint =
    "https://atcoder.jp/contests/";

  async fetchContests(): Promise<NormalizedContest[]> {

    const response = await fetch(this.endpoint, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/154.0 Safari/537.36"
      }
    });

    if (!response.ok) {
      throw new Error(
        `AtCoder page failed: ${response.status} ${response.statusText}`
      );
    }

    const html = await response.text();

    const $ = cheerio.load(html);

    const contests: NormalizedContest[] = [];

    /*
     * AtCoder's official Upcoming Contests table.
     */
    $("#contest-table-upcoming tbody tr").each(
      (_, row) => {

        const cells = $(row).find("td");

        /*
         * Expected columns:
         *
         * 0 -> Start time
         * 1 -> Contest name
         * 2 -> Duration
         */
        if (cells.length < 3) {
          return;
        }

        const startText =
          $(cells[0]).text().trim();

        const contestLink =
          $(cells[1]).find("a");

        const name =
          contestLink.text().trim();

        const href =
          contestLink.attr("href");

        const durationText =
          $(cells[2]).text().trim();

        /*
         * Ignore malformed rows.
         */
        if (
          !name ||
          !href ||
          !startText ||
          !durationText
        ) {
          return;
        }

        /*
         * Example:
         *
         * /contests/arc231
         *
         * externalId:
         *
         * arc231
         */
        const match =
          href.match(
            /\/contests\/([^/]+)/
          );

        if (!match) {
          return;
        }

        const externalId =
          match[1];

        /*
         * Convert AtCoder date/time
         * into JavaScript Date.
         */
        const startTime =
          parseAtCoderDate(startText);

        if (!startTime) {
          return;
        }

        /*
         * Convert contest duration
         * into minutes.
         */
        const durationMinutes =
          parseDuration(durationText);

        if (durationMinutes <= 0) {
          return;
        }

        /*
         * Add normalized contest.
         *
         * Note:
         * NormalizedContest does NOT contain endTime,
         * so we only store the fields supported
         * by the existing backend architecture.
         */
        contests.push({

          platform:
            this.platform,

          externalId,

          name,

          startTime:
            startTime.toISOString(),

          durationMinutes,

          url:
            `https://atcoder.jp${href}`,

          status:
            "BEFORE"
        });
      }
    );

    /*
     * Keep only contests that have not started yet.
     */
    return contests
      .filter(
        contest =>
          new Date(
            contest.startTime
          ).getTime() > Date.now()
      )
      .sort(
        (a, b) =>
          new Date(a.startTime).getTime() -
          new Date(b.startTime).getTime()
      );
  }
}


/**
 * Parse AtCoder's start time.
 *
 * AtCoder currently provides values like:
 *
 * 2026-10-04 21:00:00+0900
 *
 * The +0900 part means Japan Standard Time (JST).
 */
function parseAtCoderDate(
  value: string
): Date | null {

  const normalized =
    value
      .replace(/\s+/g, " ")
      .trim();

  /*
   * Match:
   *
   * YYYY-MM-DD HH:MM:SS+0900
   */
  const match =
    normalized.match(
      /^(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2}:\d{2})([+-]\d{4})$/
    );

  if (!match) {
    return null;
  }

  const [
    ,
    datePart,
    timePart,
    timezonePart
  ] = match;

  /*
   * Convert:
   *
   * +0900
   *
   * into:
   *
   * +09:00
   *
   * because JavaScript's ISO parser expects
   * the colon-separated timezone format.
   */
  const timezone =
    `${timezonePart.slice(0, 3)}:${timezonePart.slice(3)}`;

  const isoString =
    `${datePart}T${timePart}${timezone}`;

  const date =
    new Date(isoString);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return null;
  }

  return date;
}


/**
 * Parse AtCoder contest duration.
 *
 * Supported:
 *
 * 02:00
 * 01:40
 * 05:00
 *
 * Also:
 *
 * 02:00:00
 * 01:40:00
 */
function parseDuration(
  value: string
): number {

  const normalized =
    value
      .replace(/\s+/g, "")
      .trim();

  const parts =
    normalized.split(":");

  /*
   * We support either:
   *
   * HH:MM
   *
   * or:
   *
   * HH:MM:SS
   */
  if (
    parts.length !== 2 &&
    parts.length !== 3
  ) {
    return 0;
  }

  const hours =
    Number(parts[0]);

  const minutes =
    Number(parts[1]);

  const seconds =
    parts.length === 3
      ? Number(parts[2])
      : 0;

  if (
    !Number.isFinite(hours) ||
    !Number.isFinite(minutes) ||
    !Number.isFinite(seconds)
  ) {
    return 0;
  }

  /*
   * Convert everything to minutes.
   *
   * Math.ceil handles durations containing seconds.
   */
  return Math.ceil(
    (
      hours * 3600 +
      minutes * 60 +
      seconds
    ) / 60
  );
}