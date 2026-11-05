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

export function decodeResultPayload(payload: string): SharedResult | null {
  if (!payload || payload.length > 5000 || !/^[A-Za-z0-9_-]+$/.test(payload)) return null;
  try {
    const b64 = payload.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(payload.length / 4) * 4, "=");
    const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
    const value = JSON.parse(new TextDecoder().decode(bytes)) as Partial<SharedResult>;
    if (value.v !== 1 || !Array.isArray(value.top) || value.top.length !== 5 ||
      !value.top.every(id => Number.isInteger(id) && id >= 0 && id < SONG_TITLES.length)) return null;
    return {
      v: 1,
      top: value.top as number[],
      tags: Array.isArray(value.tags) ? value.tags.filter((t): t is string => typeof t === "string").slice(0, 12) : []
    };
  } catch { return null; }
}
