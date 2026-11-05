export const SONG_TITLES = [
  "YoYo",
  "UhUh",
  "Counting Star",
  "Lucky you",
  "LOVE ATTACK",
  "New World",
  "Pinball",
  "CRASH",
  "Glow Up",
  "Going on",
  "In my lotion",
  "Cotton Candy",
  "밤밤밤",
  "Deja Vu",
  "Mood",
  "고백주파수",
  "Heart Drop",
  "Bloom",
  "Love Echo",
  "Hello XO",
  "MVP",
  "Higher",
  "Busy Boy",
  "Runaway",
  "Pretty Girl",
  "Finest Thing",
  "With",
  "백화요란(Inside Out)",
  "MEME",
  "Dragon"
] as const;

export type SharedResult = { v: 1; top: number[]; tags: string[] };

const DEFAULT_TAGS = ["#RESCENE", "#리센느", "#RESCENE_TOP5"] as const;

/**
 * Encodes exactly five song IDs as a five-character base-36 path segment.
 * Each ID is a base-30 digit because the catalogue contains 30 songs.
 */
export function encodeCompactResult(top: readonly number[]): string {
  if (top.length !== 5 || !top.every(id => Number.isInteger(id) && id >= 0 && id < SONG_TITLES.length)) {
    throw new Error("A shared result must contain exactly five valid song IDs.");
  }
  const packed = top.reduce((value, id) => value * SONG_TITLES.length + id, 0);
  return packed.toString(36).padStart(5, "0");
}

export function decodeResultPayload(payload: string): SharedResult | null {
  if (!payload || payload.length > 5000) return null;

  // New compact URLs look like /r/0ab12 and contain only the five ranked song IDs.
  if (/^[0-9a-z]{5}$/i.test(payload)) {
    let packed = Number.parseInt(payload, 36);
    if (!Number.isSafeInteger(packed) || packed < 0 || packed >= SONG_TITLES.length ** 5) return null;
    const top = new Array<number>(5);
    for (let i = 4; i >= 0; i--) {
      top[i] = packed % SONG_TITLES.length;
      packed = Math.floor(packed / SONG_TITLES.length);
    }
    if (packed !== 0) return null;
    return { v: 1, top, tags: [...DEFAULT_TAGS] };
  }

  // Keep previously shared long Base64URL links working.
  if (!/^[A-Za-z0-9_-]+$/.test(payload)) return null;
  try {
    const b64 = payload.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(payload.length / 4) * 4, "=");
    const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
    const value = JSON.parse(new TextDecoder().decode(bytes)) as Partial<SharedResult>;
    if (value.v !== 1 || !Array.isArray(value.top) || value.top.length !== 5 ||
      !value.top.every(id => Number.isInteger(id) && id >= 0 && id < SONG_TITLES.length)) return null;
    return {
      v: 1,
      top: value.top as number[],
      tags: Array.isArray(value.tags) ? value.tags.filter((t): t is string => typeof t === "string").slice(0, 12) : [...DEFAULT_TAGS]
    };
  } catch {
    return null;
  }
}
